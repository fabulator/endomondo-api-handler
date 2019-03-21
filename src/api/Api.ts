import { parseUrl } from 'query-string';
import { DateTime } from 'luxon';
import { ApiResponseType, DefaultResponseProcessor } from 'rest-api-handler';
import CookieApi from 'cookie-api-handler';
import { ENDOMONDO_URL } from '../constants';
import { EndomondoException, EndomondoApiException } from '../exceptions';
import { Workout } from '../models';
import * as TYPES from '../types';

export default class Api extends CookieApi<ApiResponseType<any>> {
    protected userId: number | null = null;

    protected userToken: string | null = null;

    protected csfrtoken: string;

    protected dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ss\'.000Z\'';

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
    }

    public setUserId(id: number | null) {
        this.userId = id;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    public setUserToken(token: string | null) {
        this.userToken = token;

        this.setDefaultHeader('cookie', Api.serializeCookies({
            CSRF_TOKEN: this.csfrtoken,
            ...(token ? { USER_TOKEN: token } : {}),
        }));
    }

    public getUserToken(): string | null {
        return this.userToken;
    }

    /**
     * Converting date to string for GET requests.
     *
     * @param date
     * @returns {string}
     */
    protected getDateString(date: DateTime) {
        return date.toUTC().toFormat(this.dateFormat);
    }

    /**
     * Get api url for user namespace.
     */
    protected async getUserApiUrl(namespace: string, userId: number | null = this.userId): Promise<string> {
        if (!userId) {
            throw new EndomondoException('User id is not defined');
        }

        return `rest/v1/users/${userId}/${namespace}`;
    }

    /**
     * Get api url for workout namespace.
     */
    protected async getWorkoutsApiUrl(namespace: string, workoutId: number | null, userId: number | null = this.userId): Promise<string> {
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
        const response: ApiResponseType<TYPES.API.User> = await this.post('rest/session', {
            email,
            password,
            remember: true,
        });

        this.setUserId(response.data.id);

        const cookies = this.getCookies();

        if (!cookies) {
            throw new EndomondoException('Cookies are missing in response.');
        }

        this.setUserToken(cookies.USER_TOKEN);

        return cookies.USER_TOKEN;
    }

    public async getProfile(userId: number | null = this.userId): Promise<TYPES.API.Profile> {
        const { data } = await this.get(await this.getUserApiUrl(''));

        return data;
    }

    public async getWorkout(workoutId: number, userId: number | null = this.userId): Promise<Workout<number, TYPES.API.Workout>> {
        const response: ApiResponseType<TYPES.API.Workout> = await this.get(await this.getWorkoutsApiUrl('', workoutId, userId));
        return Workout.fromApi(response.data);
    }

    public async getWorkoutGpx(workoutId: number, userId: number | null = this.userId): Promise<string> {
        const { data } = await this.get(await this.getWorkoutsApiUrl('export?format=GPX', workoutId, userId));
        return data;
    }

    public async getWorkoutTcx(workoutId: number, userId: number | null = this.userId): Promise<string> {
        const { data } = await this.get(await this.getWorkoutsApiUrl('export?format=TCX', workoutId, userId));
        return data;
    }

    public async editWorkout(workout: Workout<number>, userId: number | null = this.userId) {
        const distance = workout.getDistance();
        const ascent = workout.getAscent();
        const descent = workout.getDescent();

        return this.put(await this.getWorkoutsApiUrl('', workout.getId(), userId), {
            duration: workout.getDuration().as('seconds'),
            sport: workout.getTypeId(),
            start_time: this.getDateString(workout.getStart()),
            ...(distance != null ? { distance: distance.toNumber('km') } : {}),
            ...(workout.getAvgHeartRate() != null ? { heart_rate_avg: workout.getAvgHeartRate() } : {}),
            ...(workout.getMaxHeartRate() != null ? { heart_rate_max: workout.getMaxHeartRate() } : {}),
            ...(workout.getTitle() != null ? { title: workout.getTitle() } : {}),
            ...(ascent != null ? { ascent: ascent.toNumber('m') } : {}),
            ...(descent != null ? { descent: descent.toNumber('m') } : {}),
            ...(workout.getMessage() != null ? { message: workout.getMessage() } : {}),
            ...(workout.getMapPrivacy() != null ? { show_map: workout.getMapPrivacy() } : {}),
            ...(workout.getWorkoutPrivacy() != null ? { show_workout: workout.getWorkoutPrivacy() } : {}),
        });
    }

    public async deleteWorkout(workoutId: number, userId: number | null = this.userId) {
        return this.delete(await this.getWorkoutsApiUrl('', workoutId, userId));
    }

    public async addHashtag(hashtag: string, workoutId: number, userId: number | null = this.userId) {
        return this.post(await this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    public async removeHashtag(hashtag: string, workoutId: number, userId: number | null = this.userId) {
        return this.delete(await this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    public async getWorkouts(
        filter: TYPES.WorkoutFilters = {},
        userId: number | null = this.userId,
    ): Promise<TYPES.RESPONSES.ListOfWorkouts> {
        const {
            after,
            before,
            fromDuration,
            toDuration,
        } = filter;

        const response: ApiResponseType<TYPES.API.Workouts> = await this.get(await this.getWorkoutsApiUrl('history', null, userId), {
            expand: 'points,workout',
            ...filter,
            ...(after != null ? { after: typeof after === 'string' ? after : this.getDateString(after) } : {}),
            ...(before != null ? { before: typeof before === 'string' ? before : this.getDateString(before) } : {}),
            ...(fromDuration != null ? { fromDuration: typeof fromDuration === 'number' ? fromDuration : fromDuration.as('seconds') } : {}),
            ...(toDuration != null ? { toDuration: typeof toDuration === 'number' ? toDuration : toDuration.as('seconds') } : {}),
        });

        return {
            paging: response.data.paging,
            workouts: response.data.data.map((workout) => {
                return Workout.fromApi(workout);
            }),
        };
    }

    public async processWorkouts(
        filter: TYPES.WorkoutFilters = {},
        processor: (workout: Workout<number, TYPES.API.Workout>) => Promise<Workout>,
        userId: number | null = this.userId,
    ): Promise<Workout[]> {
        const { workouts, paging } = await this.getWorkouts(filter, userId);

        const processorPromises = workouts.map((workout) => {
            return processor(workout);
        });

        if (workouts.length > 0) {
            const data: TYPES.API.WorkoutFilters = parseUrl(paging.next).query;
            processorPromises.push(...(await this.processWorkouts(data, processor, userId)).map(async (workout) => {
                return workout;
            }));
        }

        return Promise.all(processorPromises);
    }
}
