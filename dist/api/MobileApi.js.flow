// @flow
import zlib from 'zlib';
import Api from 'rest-api-handler/src/Api';
import DefaultResponseProcessor from 'rest-api-handler/src/DefaultResponseProcessor';
import type { ApiResponseType } from 'rest-api-handler/src';
import { EndomondoApiException, EndomondoException } from './../exceptions';
import { ENDOMONDO_MOBILE_URL } from './../constants';
import type { Workout } from './../models';

function processStringResponse(response: string): Object {
    const data = {};

    response.split('\n')
        .map(item => item.split('='))
        .filter(item => item.length === 2)
        .forEach((item) => {
            const [key, value] = item;
            data[key] = value;
        });

    return data;
}

function gzipRequestBody(body: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        zlib.gzip(body, (error, buffer: Buffer) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer);
        });
    });
}

export default class MobileApi extends Api<ApiResponseType<*>> {
    authToken: ?string;
    userId: ?number;

    constructor() {
        super(ENDOMONDO_MOBILE_URL, [
            new DefaultResponseProcessor(EndomondoApiException),
        ], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)',
        });
    }

    getAuthToken(): ?string {
        return this.authToken;
    }

    setAuthToken(authToken: string) {
        this.authToken = authToken;
    }

    getUserId(): ?number {
        return this.userId;
    }

    setUserId(id: number) {
        this.userId = id;
    }

    async login(email: string, password: string): Promise<string> {
        const options = {
            email,
            password,
            country: '',
            deviceId: null,
            action: 'PAIR',
        };

        const response: ApiResponseType<string> = await this.post(`auth${Api.convertParametersToUrl(options)}`);

        const { userId, authToken }: {
            userId: string,
            authToken: string,
        } = processStringResponse(response.data);

        this.setUserId(Number(userId));
        this.setAuthToken(authToken);
        return authToken;
    }

    /**
     * Create Endomono workout.
     *
     * @param workout
     * @returns {Promise<number>} return id of new workout
     */
    async createWorkout(workout: Workout): Promise<number> {
        const options = {
            workoutId: `-${'XXXXXXXXXXXXXXXX'.split('X').map(() => {
                return Math.floor(Math.random() * 9);
            }).join('')}`,
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            extendedResponse: true,
            gzip: true,
            authToken: this.getAuthToken(),
        };

        const gzippedBody = await gzipRequestBody(workout.getPoints().map(point => point.toString()).join('\n'));
        const response = await this
            .request(
                `track${Api.convertParametersToUrl(options)}`,
                'POST',
                {
                    body: gzippedBody,
                },
            );

        const workoutId: ?number = processStringResponse(response.data)['workout.id'];

        if (!workoutId) {
            throw EndomondoException('Error while creating workout. Endomondo did not returned workout id.');
        }

        await this.updateWorkout(workout.setId(workoutId));

        return workoutId;
    }

    async updateWorkout(workout: Workout): Promise<ApiResponseType<*>> {
        const dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';
        const distance = workout.getDistance();

        const data = {
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            start_time: workout.getStart().toUTC().toFormat(dataFormat),
            end_time: workout.getStart().toUTC().toFormat(dataFormat),
            extendedResponse: true,
            gzip: true,
            ...(distance ? { distance: distance.toNumber('km') } : {}),
            ...(workout.getCalories() ? { calories: workout.getCalories() } : {}),
            ...(workout.getNotes() ? { notes: workout.getNotes() } : {}),
            ...(workout.getMapPrivacy() ? { privacy_map: workout.getMapPrivacy() } : {}),
            ...(workout.getWorkoutPrivacy() ? { privacy_workout: workout.getWorkoutPrivacy() } : {}),
        };

        const options = {
            workoutId: workout.getId(),
            userId: this.getUserId(),
            gzip: true,
            authToken: this.getAuthToken(),
        };

        const gzippedBody = await gzipRequestBody(JSON.stringify(data));

        return this
            .request(
                `api/workout/post${Api.convertParametersToUrl(options)}`,
                'POST',
                {
                    body: gzippedBody,
                },
            );
    }
}
