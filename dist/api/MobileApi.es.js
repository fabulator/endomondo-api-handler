import zlib from 'zlib';
import Api from 'rest-api-handler/dist/Api';
import DefaultResponseProcessor from 'rest-api-handler/dist/DefaultResponseProcessor';

class EndomondoException extends Error {
    constructor(message) {
        super(`Endomondo Error: ${message}`);
    }
}

/**
 * Endomondo API Exception
 */

class EndomondoApiException extends EndomondoException {

    /**
     * Constructor.
     */
    constructor(response, request) {
        super(JSON.stringify(response.data));
        this.response = response;
        this.request = request;
    }
}

const ENDOMONDO_MOBILE_URL = 'https://api.mobile.endomondo.com/mobile';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

function processStringResponse(response) {
    const data = {};

    response.split('\n').map(item => item.split('=')).filter(item => item.length === 2).forEach(item => {
        const [key, value] = item;
        data[key] = value;
    });

    return data;
}

function gzipRequestBody(body) {
    return new Promise((resolve, reject) => {
        zlib.gzip(body, (error, buffer) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer);
        });
    });
}

class MobileApi extends Api {

    constructor() {
        super(ENDOMONDO_MOBILE_URL, [new DefaultResponseProcessor(EndomondoApiException)], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)'
        });
        this.dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';
    }

    getAuthToken() {
        return this.authToken;
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(id) {
        this.userId = id;
    }

    async login(email, password) {
        const options = {
            email,
            password,
            country: '',
            deviceId: null,
            action: 'PAIR'
        };

        const response = await this.post(`auth${Api.convertParametersToUrl(options)}`);

        const { userId, authToken } = processStringResponse(response.data);

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
    async createWorkout(workout) {
        const options = {
            workoutId: `-${'XXXXXXXXXXXXXXXX'.split('X').map(() => {
                return Math.floor(Math.random() * 9);
            }).join('')}`,
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            extendedResponse: true,
            gzip: true,
            authToken: this.getAuthToken()
        };

        const gzippedBody = await gzipRequestBody(workout.getPoints().map(point => point.toString()).join('\n'));
        const response = await this.request(`track${Api.convertParametersToUrl(options)}`, 'POST', {
            body: gzippedBody
        });

        const workoutId = processStringResponse(response.data)['workout.id'];

        if (!workoutId) {
            throw EndomondoException('Error while creating workout. Endomondo did not returned workout id.');
        }

        await this.updateWorkout(workout.setId(workoutId));

        return workoutId;
    }

    async updateWorkout(workout) {
        const distance = workout.getDistance();

        const data = _extends({
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            start_time: workout.getStart().toUTC().toFormat(this.dataFormat),
            end_time: workout.getStart().toUTC().toFormat(this.dataFormat),
            extendedResponse: true,
            gzip: true
        }, distance ? { distance: distance.toNumber('km') } : {}, workout.getCalories() ? { calories: workout.getCalories() } : {}, workout.getNotes() ? { notes: workout.getNotes() } : {}, workout.getMapPrivacy() ? { privacy_map: workout.getMapPrivacy() } : {}, workout.getWorkoutPrivacy() ? { privacy_workout: workout.getWorkoutPrivacy() } : {});

        const options = {
            workoutId: workout.getId(),
            userId: this.getUserId(),
            gzip: true,
            authToken: this.getAuthToken()
        };

        return this.request(`api/workout/post${Api.convertParametersToUrl(options)}`, 'POST', {
            body: await gzipRequestBody(JSON.stringify(data))
        });
    }
}

export default MobileApi;
