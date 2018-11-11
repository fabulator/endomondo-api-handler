import { gzip } from 'zlib';
import Api from 'rest-api-handler/src/Api';
import { DefaultResponseProcessor, ApiResponseType } from 'rest-api-handler';
import { EndomondoApiException, EndomondoException } from './../exceptions';
import { ENDOMONDO_MOBILE_URL } from './../constants';
import { Workout } from './../models';

function processStringResponse(response: string): {[property: string]: string} {
    const data: {[property: string]: string} = {};

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
        gzip(body, (error, buffer: Buffer) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer);
        });
    });
}

export default class MobileApi extends Api<ApiResponseType<any>> {
    private authToken: string | null;

    private userId: number | null;

    private static dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';

    public constructor() {
        super(ENDOMONDO_MOBILE_URL, [
            new DefaultResponseProcessor(EndomondoApiException),
        ], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)',
        });
        this.authToken = null;
        this.userId = null;
    }

    public getAuthToken(): string | null {
        return this.authToken;
    }

    public setAuthToken(authToken: string | null) {
        this.authToken = authToken;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    public setUserId(id: number | null) {
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

        const decoded = processStringResponse(response.data);

        if (!decoded.userId || decoded.authToken) {
            throw new EndomondoException(`User id and token was not found in response: ${response.data}`);
        }

        const userId = decoded.userId;
        const authToken = decoded.authToken;
        this.setUserId(Number(userId));
        this.setAuthToken(authToken);
        return authToken;
    }

    /**
     * Create Endomondo workout.
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

        const workoutId = processStringResponse(response.data)['workout.id'];

        if (!workoutId) {
            throw new EndomondoException('Error while creating workout. Endomondo did not returned workout id.');
        }

        const numberedWorkoutId = Number(workoutId);

        await this.updateWorkout(workout.setId(numberedWorkoutId));

        return numberedWorkoutId;
    }

    async updateWorkout(workout: Workout): Promise<ApiResponseType<any>> {
        const distance = workout.getDistance();

        const data = {
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            start_time: workout.getStart().toUTC().toFormat(MobileApi.dataFormat),
            end_time: workout.getStart().toUTC().toFormat(MobileApi.dataFormat),
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

        return this
            .request(
                `api/workout/post${Api.convertParametersToUrl(options)}`,
                'POST',
                {
                    body: await gzipRequestBody(JSON.stringify(data)),
                },
            );
    }
}
