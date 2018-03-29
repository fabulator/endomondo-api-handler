// @flow
import cookie from 'cookie';
import queryString from 'query-string';
import { DateTime } from 'luxon';
import ApiHandler from 'rest-api-handler/src/Api';
import DefaultResponseProcessor from 'rest-api-handler/src/DefaultResponseProcessor';
import type { ApiResponseType } from 'rest-api-handler/src';
import { ENDOMONDO_URL } from './../constants';
import {
    EndomondoException,
    EndomondoApiException,
} from './../exceptions';
import type { Workout } from './../models';
import { WorkoutFactory } from './../factories';
import type {
    ApiUser,
    WorkoutFilters,
    ApiWorkouts,
    ApiWorkout,
    Paging,
} from './../types';

function serializeCookies(cookies: { [string]: string }): string {
    return Object.keys(cookies).map((name) => {
        return cookie.serialize(name, cookies[name]);
    }).join(';');
}

type ListOfWorkouts = {
    workouts: Array<Workout>,
} & Paging;

export default class Api extends ApiHandler<ApiResponseType<Object>> {
    userId: ?number;
    csfrtoken: string;
    dateFormat: string = 'yyyy-MM-dd\'T\'HH:mm:ss\'.000Z\'';

    constructor(csfrtoken: string = '123456789') {
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

    setUserId(id: number) {
        this.userId = id;
    }

    getUserId(): ?number {
        return this.userId;
    }

    setUserToken(token: string) {
        this.setDefaultHeader('cookie', serializeCookies({
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
    getDateString(date: DateTime) {
        return date.toUTC().toFormat(this.dateFormat);
    }

    /**
     * Get api url for user namespace.
     */
    getUserApiUrl(namespace: string, userId: ?number = this.userId): string {
        if (!userId) {
            throw new EndomondoException('User id is not defined');
        }

        return `rest/v1/users/${userId}/${namespace}`;
    }

    /**
     * Get api url for workout namespace.
     */
    getWorkoutsApiUrl(namespace: string, workoutId: ?number, userId: ?number): string {
        return this.getUserApiUrl(`workouts/${workoutId ? `${workoutId}${namespace ? `/${namespace}` : ''}` : namespace}`, userId);
    }

    /**
     * Log user to Endomondo and set user id and user token.
     *
     * @param email
     * @param password
     * @returns {Promise<string>} return user token
     */
    async login(email: string, password: string): Promise<string> {
        const response: ApiResponseType<ApiUser> = await this.post('rest/session', {
            email,
            password,
            remember: true,
        });

        const token = cookie.parse(response.source.headers.get('set-cookie')).USER_TOKEN;
        this.setUserId(response.data.id);
        this.setUserToken(token);
        return token;
    }

    async getWorkout(workoutId: number, userId: ?number): Promise<Workout> {
        const response: ApiResponseType<ApiWorkout> = await this.get(this.getWorkoutsApiUrl('', workoutId, userId));
        return WorkoutFactory.getWorkoutFromApi(response.data);
    }

    // eslint-disable-next-line complexity
    editWorkout(workout: Workout, userId: ?number) {
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

    deleteWorkout(workoutId: number, userId: ?number) {
        return this.delete(this.getWorkoutsApiUrl('', workoutId, userId));
    }

    addHashtag(hashtag: string, workoutId: number, userId: ?number) {
        return this.post(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    removeHashtag(hashtag: string, workoutId: number, userId: ?number) {
        return this.delete(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    // eslint-disable-next-line complexity
    async getWorkouts(filter: WorkoutFilters = {}, userId: ?number): Promise<ListOfWorkouts> {
        const {
            after,
            before,
            fromDuration,
            toDuration,
        } = filter;

        const response: ApiResponseType<ApiWorkouts> = await this.get(this.getWorkoutsApiUrl('history', null, userId), {
            ...filter,
            ...(after ? { after: typeof after === 'string' ? after : this.getDateString(after) } : {}),
            ...(before ? { before: typeof before === 'string' ? before : this.getDateString(before) } : {}),
            ...(fromDuration ? { fromDuration: typeof fromDuration === 'number' ? fromDuration : fromDuration.as('seconds') } : {}),
            ...(toDuration ? { toDuration: typeof toDuration === 'number' ? toDuration : toDuration.as('seconds') } : {}),
        });

        return {
            paging: response.data.paging,
            workouts: response.data.data.map((workout) => {
                return WorkoutFactory.getWorkoutFromApi(workout);
            }),
        };
    }

    async processWorkouts(
        filter: WorkoutFilters = {},
        processor: (workout: Workout) => Promise<Workout>,
        userId: ?number,
    ): Promise<Array<Workout>> {
        const { workouts, paging } = await this.getWorkouts(filter, userId);

        const processorPromises = workouts.map((workout) => {
            return processor(workout);
        });

        if (workouts.length) {
            const data = queryString.parseUrl(paging.next).query;
            processorPromises.push(...await this.processWorkouts(data, processor));
        }

        return Promise.all(processorPromises);
    }
}
