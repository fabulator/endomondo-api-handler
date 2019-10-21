import { gzip } from 'zlib';
import { Api, ApiResponseType } from 'rest-api-handler';
import { EndomondoApiException, EndomondoAuthException, EndomondoException } from '../exceptions';
import { ENDOMONDO_MOBILE_URL } from '../constants';
import { Workout } from '../models';

function processStringResponse(response: string): {[property: string]: string} {
    const data: {[property: string]: string} = {};

    response.split('\n')
        .map((item) => item.split('='))
        .filter((item) => item.length === 2)
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
    protected authToken: string | null;

    protected userId: number | null;

    protected static dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';

    public constructor() {
        super(ENDOMONDO_MOBILE_URL, [
            async (response: Response, request: Request) => {
                const contentType = response.headers.get('content-type');

                const toResponse = {
                    data: contentType && contentType.includes('json') ? await response.json() : await response.text(),
                    status: response.status,
                    source: response,
                    request,
                };

                if ((typeof toResponse.data === 'object' && toResponse.data.error) || !response.ok) {
                    if (toResponse.data.error && toResponse.data.error.type === 'AUTH_FAILED') {
                        throw new EndomondoAuthException(toResponse);
                    }

                    throw new EndomondoApiException(toResponse);
                }

                return toResponse;
            },
        ], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)',
        });
        this.authToken = null;
        this.userId = null;
    }

    public getUserToken(): string | null {
        return this.authToken;
    }

    public setUserToken(authToken: string | null) {
        this.authToken = authToken;
    }

    public getUserId(): number | null {
        return this.userId;
    }

    public setUserId(id: number | null) {
        this.userId = id;
    }

    public async login(email: string, password: string): Promise<string> {
        const options = {
            email,
            password,
            country: '',
            deviceId: null,
            action: 'PAIR',
        };

        const response: ApiResponseType<string> = await this.post(`auth${Api.convertParametersToUrl(options)}`);

        const decoded = processStringResponse(response.data);

        if (!decoded.userId || !decoded.authToken) {
            throw new EndomondoException(`User id and token was not found in response: ${response.data}`);
        }

        const { userId, authToken } = decoded;

        this.setUserId(Number(userId));
        this.setUserToken(authToken);

        return authToken;
    }

    public async getProfile(): Promise<any> {
        return this.get('api/workouts', {
            authToken: this.getUserToken(),
        });
    }

    /**
     * Create Endomondo workout.
     *
     * @param workout
     * @returns {Promise<number>} return id of new workout
     */
    public async createWorkout(workout: Workout): Promise<number> {
        const options = {
            workoutId: `-${'XXXXXXXXXXXXXXXX'.split('X').map(() => {
                return Math.floor(Math.random() * 9);
            }).join('')}`,
            duration: workout.getDuration().as('seconds'),
            sport: workout.getTypeId(),
            extendedResponse: true,
            gzip: true,
            authToken: this.getUserToken(),
        };

        const gzippedBody = await gzipRequestBody(workout.getPoints().map((point) => point.toString()).join('\n'));
        const response = await this
            .request(
                `track${Api.convertParametersToUrl(options)}`,
                'POST',
                {
                    body: gzippedBody,
                },
            );

        if (response.data.trim() === 'AUTH_FAILED') {
            throw new EndomondoAuthException(response);
        }

        const workoutId = processStringResponse(response.data)['workout.id'];

        if (!workoutId) {
            throw new EndomondoException('Error while creating workout. Endomondo did not returned workout id.');
        }

        const numberedWorkoutId = Number(workoutId);

        await this.updateWorkout(workout.setId(numberedWorkoutId));

        return numberedWorkoutId;
    }

    public async updateWorkout(workout: Workout<number>): Promise<ApiResponseType<any>> {
        const distance = workout.getDistance();

        const data = {
            duration: workout.getDuration().as('seconds'),
            sport: workout.getTypeId(),
            start_time: workout.getStart().toUTC().toFormat(MobileApi.dataFormat),
            end_time: workout.getStart().toUTC().toFormat(MobileApi.dataFormat),
            extendedResponse: true,
            gzip: true,
            ...(distance != null ? { distance: distance.toNumber('km') } : {}),
            ...(workout.getCalories() != null ? { calories: workout.getCalories() } : {}),
            ...(workout.getMessage() != null ? { message: workout.getMessage() } : {}),
            ...(workout.getMapPrivacy() != null ? { privacy_map: workout.getMapPrivacy() } : {}),
            ...(workout.getWorkoutPrivacy() != null ? { privacy_workout: workout.getWorkoutPrivacy() } : {}),
        };

        const options = {
            workoutId: workout.getId(),
            userId: this.getUserId(),
            gzip: true,
            authToken: this.getUserToken(),
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
