import { parseUrl } from 'query-string';
import { DateTime } from 'luxon';
import { ApiResponseType, DefaultResponseProcessor } from 'rest-api-handler';
import CookieApi from 'cookie-api-handler';
import { ENDOMONDO_URL } from '../constants';
import {
    EndomondoException,
    EndomondoApiException,
} from '../exceptions';
import { Workout } from '../models';
import {
    ApiUser,
    WorkoutFilters,
    ApiWorkouts,
    ApiWorkout,
    Paging,
} from '../types';

type ListOfWorkouts = {
    workouts: Array<Workout>,
} & Paging;

export default class Api extends CookieApi<ApiResponseType<any>> {
    private userId: number | null;

    private csfrtoken: string;

    private dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ss\'.000Z\'';

    public constructor(csfrtoken = '123456789') {
        super(ENDOMONDO_URL, [
            new DefaultResponseProcessor(EndomondoApiException),
        ]);
        this.csfrtoken = csfrtoken;
        this.setDefaultHeaders({
            'content-type': 'application/json;charset=UTF-8',
            'x-csrf-token': this.csfrtoken,
            cookie: `CSRF_TOKEN=${this.csfrtoken};`,
        });
        this.userId = null;
    }

    public setUserId(id: number | null) {
        this.userId = id;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    public setUserToken(token: string) {
        this.setDefaultHeader('cookie', Api.serializeCookies({
            CSRF_TOKEN: this.csfrtoken,
            USER_TOKEN: token,
        }));
    }

    /**
     * Converting date to string for GET requests.
     *
     * @param date
     * @returns {string}
     */
    private getDateString(date: DateTime) {
        return date.toUTC().toFormat(this.dateFormat);
    }

    /**
     * Get api url for user namespace.
     */
    private getUserApiUrl(namespace: string, userId: number | null = this.userId): string {
        if (!userId) {
            throw new EndomondoException('User id is not defined');
        }

        return `rest/v1/users/${userId}/${namespace}`;
    }

    /**
     * Get api url for workout namespace.
     */
    private getWorkoutsApiUrl(namespace: string, workoutId: number | null, userId: number | null): string {
        return this.getUserApiUrl(`workouts/${workoutId ? `${workoutId}${namespace ? `/${namespace}` : ''}` : namespace}`, userId);
    }

    /**
     * Log user to Endomondo and set user id and user token.
     *
     * @param email
     * @param password
     * @returns {Promise<string>} return user token
     */
    public async login(email: string, password: string): Promise<string> {
        const response: ApiResponseType<ApiUser> = await this.post('rest/session', {
            email,
            password,
            remember: true,
        });

        this.setUserId(response.data.id);

        const cookies = this.getCookies();

        if (!cookies) {
            throw new EndomondoException('Cookies are missing in response.');
        }

        return cookies.USER_TOKEN;
    }

    public async getWorkout(workoutId: number, userId: number | null = this.userId): Promise<Workout> {
        const response: ApiResponseType<ApiWorkout> = await this.get(this.getWorkoutsApiUrl('', workoutId, userId));
        return Workout.fromApi(response.data);
    }

    // eslint-disable-next-line complexity
    public editWorkout(workout: Workout, userId: number | null = this.userId) {
        const distance = workout.getDistance();

        return this.put(this.getWorkoutsApiUrl('', workout.getId(), userId), {
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            start_time: this.getDateString(workout.getStart()),
            ...(distance ? { distance: distance.toNumber('km') } : {}),
            ...(workout.getAvgHeartRate() ? { heart_rate_avg: workout.getAvgHeartRate() } : {}),
            ...(workout.getMaxHeartRate() ? { heart_rate_max: workout.getMaxHeartRate() } : {}),
            ...(workout.getTitle() ? { title: workout.getTitle() } : {}),
            ...(workout.getAscent() ? { ascent: workout.getAscent() } : {}),
            ...(workout.getDescent() ? { descent: workout.getDescent() } : {}),
            ...(workout.getNotes() ? { notes: workout.getNotes() } : {}),
            ...(workout.getMapPrivacy() !== null ? { show_map: workout.getMapPrivacy() } : {}),
            ...(workout.getWorkoutPrivacy() !== null ? { show_workout: workout.getWorkoutPrivacy() } : {}),
        });
    }

    public deleteWorkout(workoutId: number, userId: number | null = this.userId) {
        return this.delete(this.getWorkoutsApiUrl('', workoutId, userId));
    }

    public addHashtag(hashtag: string, workoutId: number, userId: number | null = this.userId) {
        return this.post(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    public removeHashtag(hashtag: string, workoutId: number, userId: number | null = this.userId) {
        return this.delete(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    // eslint-disable-next-line complexity
    public async getWorkouts(filter: WorkoutFilters = {}, userId: number | null): Promise<ListOfWorkouts> {
        const {
            after,
            before,
            fromDuration,
            toDuration,
        } = filter;

        const response: ApiResponseType<ApiWorkouts> = await this.get(this.getWorkoutsApiUrl('history', null, userId), {
            expand: 'points,workout',
            ...filter,
            ...(after ? { after: typeof after === 'string' ? after : this.getDateString(after) } : {}),
            ...(before ? { before: typeof before === 'string' ? before : this.getDateString(before) } : {}),
            ...(fromDuration ? { fromDuration: typeof fromDuration === 'number' ? fromDuration : fromDuration.as('seconds') } : {}),
            ...(toDuration ? { toDuration: typeof toDuration === 'number' ? toDuration : toDuration.as('seconds') } : {}),
        });

        return {
            paging: response.data.paging,
            workouts: response.data.data.map((workout) => {
                return Workout.fromApi(workout);
            }),
        };
    }

    public async processWorkouts(
        filter: WorkoutFilters = {},
        processor: (workout: Workout) => Promise<Workout>,
        userId: number | null = null,
    ): Promise<Array<Workout>> {
        const { workouts, paging } = await this.getWorkouts(filter, userId);

        const processorPromises = workouts.map((workout) => {
            return processor(workout);
        });

        if (workouts.length > 0) {
            const data: Object = parseUrl(paging.next).query;
            // @ts-ignore
            processorPromises.push(...await this.processWorkouts(data, processor));
        }

        return Promise.all(processorPromises);
    }
}
