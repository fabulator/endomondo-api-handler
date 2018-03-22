'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var luxon = require('luxon');
var cookie = _interopDefault(require('cookie'));
var queryString = _interopDefault(require('query-string'));
var dist = require('rest-api-handler/dist');
var zlib = _interopDefault(require('zlib'));

const RUNNING = 0;
const CYCLING_TRANSPORT = 1;
const CYCLING_SPORT = 2;
const MOUNTAIN_BIKINGS = 3;
const SKATING = 4;
const ROLLER_SKIING = 5;
const SKIING_CROSS_COUNTRY = 6;
const SKIING_DOWNHILL = 7;
const SNOWBOARDING = 8;
const KAYAKING = 9;
const KITE_SURFING = 10;
const ROWING = 11;
const SAILING = 12;
const WINDSURFING = 13;
const FINTESS_WALKING = 14;
const GOLFING = 15;
const HIKING = 16;
const ORIENTEERING = 17;
const WALKING = 18;
const RIDING = 19;
const SWIMMING = 20;
const CYCLING_INDOOR = 21;
const OTHER = 22;
const AEROBICS = 23;
const BADMINTON = 24;
const BASEBALL = 25;
const BASKETBALL = 26;
const BOXING = 27;
const CLIMBING_STAIRS = 28;
const CRICKET = 29;
const ELLIPTICAL_TRAINING = 30;
const DANCING = 31;
const FENCING = 32;
const FOOTBALL_AMERICAN = 33;
const FOOTBALL_RUGBY = 34;
const FOOTBALL_SOCCER = 35;
const HANDBALL = 36;
const HOCKEY = 37;
const PILATES = 38;
const POLO = 39;
const SCUBA_DIVING = 40;
const SQUASH = 41;
const TABLE_TENIS = 42;
const TENNIS = 43;
const VOLEYBALL_BEACH = 44;
const VOLEYBALL_INDOOR = 45;
const WEIGHT_TRAINING = 46;
const YOGA = 47;
const MARTINAL_ARTS = 48;
const GYMNASTICS = 49;
const STEP_COUNTER = 50;
const CIRKUIT_TRAINING = 87;
const RUNNING_TREADMILL = 88;
const SKATEBOARDING = 89;
const SURFING = 90;
const SNOWSHOEING = 91;
const WHEELCHAIR = 92;
const CLIMBING = 93;
const WALKING_TREADMILL = 94;
const KICK_SCOOTER = 95;
const STAND_UP_PADDLING = 96;
const TRAIL_RUNNING = 97;
const ROWING_INDOORS = 98;
const FLOORBALL = 99;
const ICE_SKATING = 100;
const SKI_TOURING = 101;
const ROPE_JUMPING = 102;
const STRETCHING = 103;
const CANICROSS = 104;
const PADDLE_TENNIS = 105;
const PARAGLIDING = 106;

var sports = Object.freeze({
	RUNNING: RUNNING,
	CYCLING_TRANSPORT: CYCLING_TRANSPORT,
	CYCLING_SPORT: CYCLING_SPORT,
	MOUNTAIN_BIKINGS: MOUNTAIN_BIKINGS,
	SKATING: SKATING,
	ROLLER_SKIING: ROLLER_SKIING,
	SKIING_CROSS_COUNTRY: SKIING_CROSS_COUNTRY,
	SKIING_DOWNHILL: SKIING_DOWNHILL,
	SNOWBOARDING: SNOWBOARDING,
	KAYAKING: KAYAKING,
	KITE_SURFING: KITE_SURFING,
	ROWING: ROWING,
	SAILING: SAILING,
	WINDSURFING: WINDSURFING,
	FINTESS_WALKING: FINTESS_WALKING,
	GOLFING: GOLFING,
	HIKING: HIKING,
	ORIENTEERING: ORIENTEERING,
	WALKING: WALKING,
	RIDING: RIDING,
	SWIMMING: SWIMMING,
	CYCLING_INDOOR: CYCLING_INDOOR,
	OTHER: OTHER,
	AEROBICS: AEROBICS,
	BADMINTON: BADMINTON,
	BASEBALL: BASEBALL,
	BASKETBALL: BASKETBALL,
	BOXING: BOXING,
	CLIMBING_STAIRS: CLIMBING_STAIRS,
	CRICKET: CRICKET,
	ELLIPTICAL_TRAINING: ELLIPTICAL_TRAINING,
	DANCING: DANCING,
	FENCING: FENCING,
	FOOTBALL_AMERICAN: FOOTBALL_AMERICAN,
	FOOTBALL_RUGBY: FOOTBALL_RUGBY,
	FOOTBALL_SOCCER: FOOTBALL_SOCCER,
	HANDBALL: HANDBALL,
	HOCKEY: HOCKEY,
	PILATES: PILATES,
	POLO: POLO,
	SCUBA_DIVING: SCUBA_DIVING,
	SQUASH: SQUASH,
	TABLE_TENIS: TABLE_TENIS,
	TENNIS: TENNIS,
	VOLEYBALL_BEACH: VOLEYBALL_BEACH,
	VOLEYBALL_INDOOR: VOLEYBALL_INDOOR,
	WEIGHT_TRAINING: WEIGHT_TRAINING,
	YOGA: YOGA,
	MARTINAL_ARTS: MARTINAL_ARTS,
	GYMNASTICS: GYMNASTICS,
	STEP_COUNTER: STEP_COUNTER,
	CIRKUIT_TRAINING: CIRKUIT_TRAINING,
	RUNNING_TREADMILL: RUNNING_TREADMILL,
	SKATEBOARDING: SKATEBOARDING,
	SURFING: SURFING,
	SNOWSHOEING: SNOWSHOEING,
	WHEELCHAIR: WHEELCHAIR,
	CLIMBING: CLIMBING,
	WALKING_TREADMILL: WALKING_TREADMILL,
	KICK_SCOOTER: KICK_SCOOTER,
	STAND_UP_PADDLING: STAND_UP_PADDLING,
	TRAIL_RUNNING: TRAIL_RUNNING,
	ROWING_INDOORS: ROWING_INDOORS,
	FLOORBALL: FLOORBALL,
	ICE_SKATING: ICE_SKATING,
	SKI_TOURING: SKI_TOURING,
	ROPE_JUMPING: ROPE_JUMPING,
	STRETCHING: STRETCHING,
	CANICROSS: CANICROSS,
	PADDLE_TENNIS: PADDLE_TENNIS,
	PARAGLIDING: PARAGLIDING
});

const names = {
    [RUNNING]: 'Running',
    [CYCLING_TRANSPORT]: 'Cycling, transport',
    [CYCLING_SPORT]: 'Cycling, sport',
    [MOUNTAIN_BIKINGS]: 'Mountain biking',
    [SKATING]: 'Skating',
    [ROLLER_SKIING]: 'Roller skiing',
    [SKIING_CROSS_COUNTRY]: 'Skiing, cross country',
    [SKIING_DOWNHILL]: 'Skiing, downhill',
    [SNOWBOARDING]: 'Snowboarding',
    [KAYAKING]: 'Kayaking',
    [KITE_SURFING]: 'Kite surfing',
    [ROWING]: 'Rowing',
    [SAILING]: 'Sailing',
    [WINDSURFING]: 'Windsurfing',
    [FINTESS_WALKING]: 'Fitness walking',
    [GOLFING]: 'Golfing',
    [HIKING]: 'Hiking',
    [ORIENTEERING]: 'Orienteering',
    [WALKING]: 'Walking',
    [RIDING]: 'Riding',
    [SWIMMING]: 'Swimming',
    [CYCLING_INDOOR]: 'Cycling, Indoor',
    [OTHER]: 'Other',
    [AEROBICS]: 'Aerobics',
    [BADMINTON]: 'Badminton',
    [BASEBALL]: 'Baseball',
    [BASKETBALL]: 'Basketball',
    [BOXING]: 'Boxing',
    [CLIMBING_STAIRS]: 'Climbing stairs',
    [CRICKET]: 'Cricket',
    [ELLIPTICAL_TRAINING]: 'Elliptical training',
    [DANCING]: 'Dancing',
    [FENCING]: 'Fencing',
    [FOOTBALL_AMERICAN]: 'Football, American',
    [FOOTBALL_RUGBY]: 'Football, rugby',
    [FOOTBALL_SOCCER]: 'Football, soccer',
    [HANDBALL]: 'Handball',
    [HOCKEY]: 'Hockey',
    [PILATES]: 'Pilates',
    [POLO]: 'Polo',
    [SCUBA_DIVING]: 'Scuba diving',
    [SQUASH]: 'Squash',
    [TABLE_TENIS]: 'Table tennis',
    [TENNIS]: 'Tennis',
    [VOLEYBALL_BEACH]: 'Volleyball, beach',
    [VOLEYBALL_INDOOR]: 'Volleyball, indoor',
    [WEIGHT_TRAINING]: 'Weight training',
    [YOGA]: 'Yoga',
    [MARTINAL_ARTS]: 'Martial arts',
    [GYMNASTICS]: 'Gymnastics',
    [STEP_COUNTER]: 'Step counter',
    [CIRKUIT_TRAINING]: 'Circuit Training',
    [SKATEBOARDING]: 'Skateboarding',
    [CLIMBING]: 'Climbing',
    [KICK_SCOOTER]: 'Kick scooter',
    [CANICROSS]: 'Canicross',
    [FLOORBALL]: 'Floorball',
    [ICE_SKATING]: 'Ice skating',
    [RUNNING_TREADMILL]: 'Running (Treadmill)',
    [SURFING]: 'Surfing',
    [SNOWSHOEING]: 'Showshoeing',
    [WHEELCHAIR]: 'Wheelchair',
    [WALKING_TREADMILL]: 'Walking (Treadmill)',
    [STAND_UP_PADDLING]: 'Stand up paddling',
    [TRAIL_RUNNING]: 'Trail running',
    [ROWING_INDOORS]: 'Rowing (indoors)',
    [SKI_TOURING]: 'Ski touring',
    [ROPE_JUMPING]: 'Rope jumping',
    [STRETCHING]: 'Stretching',
    [PADDLE_TENNIS]: 'Paddle tennis',
    [PARAGLIDING]: 'Paragliding'
};

const PRIVACY_EVERYONE = 0;
const PRIVACY_FRIENDS = 1;
const PRIVACY_ME = 2;

var privacy = Object.freeze({
	PRIVACY_EVERYONE: PRIVACY_EVERYONE,
	PRIVACY_FRIENDS: PRIVACY_FRIENDS,
	PRIVACY_ME: PRIVACY_ME
});

const ENDOMONDO_URL = 'https://www.endomondo.com';
const ENDOMONDO_MOBILE_URL = 'https://api.mobile.endomondo.com/mobile';



var index = Object.freeze({
	ENDOMONDO_URL: ENDOMONDO_URL,
	ENDOMONDO_MOBILE_URL: ENDOMONDO_MOBILE_URL,
	SPORTS: sports,
	SPORT_NAMES: names,
	PRIVACY: privacy
});

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



var index$1 = Object.freeze({
	EndomondoException: EndomondoException,
	EndomondoApiException: EndomondoApiException
});

class Point {

    // eslint-disable-next-line complexity
    constructor({
        time,
        instruction,
        latitude,
        longitude,
        distance,
        duration,
        speed,
        hr,
        cadence,
        altitude
    }) {
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
        this.instruction = instruction || null;
        this.distance = distance || null;
        this.duration = duration || null;
        this.speed = speed || null;
        this.hr = hr || null;
        this.cadence = cadence || null;
        this.altitude = typeof altitude !== 'undefined' && altitude !== null ? altitude : null;
    }

    getTime() {
        return this.time;
    }

    setTime(time) {
        this.time = time;
        return this;
    }

    getLatitude() {
        return this.latitude;
    }

    setLatitude(latitude) {
        this.latitude = latitude;
        return this;
    }

    getLongitude() {
        return this.longitude;
    }

    setLongitude(longitude) {
        this.longitude = longitude;
        return this;
    }

    getAltitude() {
        return this.altitude;
    }

    setAltitude(altitude) {
        this.altitude = altitude;
        return this;
    }

    getInstruction() {
        return this.instruction;
    }

    setInstruction(instruction) {
        this.instruction = instruction;
        return this;
    }

    getDistance() {
        return this.distance;
    }

    setDistance(distance) {
        this.distance = distance;
        return this;
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    getHeartRate() {
        return this.hr;
    }

    setHeartRate(hr) {
        this.hr = hr;
        return this;
    }

    getCadence() {
        return this.cadence;
    }

    setCadence(cadence) {
        this.cadence = cadence;
        return this;
    }

    toString() {
        return [this.getTime().toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\''), this.getInstruction(), this.getLatitude(), this.getLongitude(), this.getDistance(), this.getSpeed(), this.getAltitude(), this.getHeartRate(), this.getCadence(), ''].map(item => {
            return item === null ? '' : item;
        }).join(';');
    }
}

class Workout {

    // eslint-disable-next-line complexity
    constructor({
        sportId,
        start,
        duration,
        distance,
        source,
        points,
        ascent,
        descent,
        calories,
        notes,
        mapPrivacy,
        workoutPrivacy,
        id,
        hashtags,
        heartRateAvg,
        heartRateMax,
        title
    }) {
        this.sportId = sportId;
        this.start = start;
        this.duration = duration;
        this.distance = distance;
        this.points = points || [];
        this.ascent = ascent || null;
        this.descent = descent || null;
        this.source = source || null;
        this.calories = calories || null;
        this.notes = notes || null;
        this.mapPrivacy = mapPrivacy || null;
        this.workoutPrivacy = workoutPrivacy || null;
        this.id = id || null;
        this.hashtags = hashtags || [];
        this.heartRateAvg = heartRateAvg || null;
        this.heartRateMax = heartRateMax || null;
        this.title = title || null;
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
        return this;
    }

    getSportId() {
        return this.sportId;
    }

    setSportId(sportId) {
        this.sportId = sportId;
        return this;
    }

    getSportName() {
        return names[this.getSportId()];
    }

    getStart() {
        return this.start;
    }

    setStart(start) {
        this.start = start;
        return this;
    }

    getEnd() {
        const points = this.getPoints();

        if (points) {
            return points[points.length - 1].getTime();
        }

        return this.getStart().plus(this.getDuration());
    }

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    getDistance() {
        return this.distance;
    }

    setDistance(distance) {
        this.distance = distance;
        return this;
    }

    getPoints() {
        return this.points;
    }

    setPoints(points) {
        this.points = points;
        return this;
    }

    getAscent() {
        return this.ascent;
    }

    setAscent(ascent) {
        this.ascent = ascent;
        return this;
    }

    getDescent() {
        return this.descent;
    }

    setDescent(descent) {
        this.descent = descent;
        return this;
    }

    getCalories() {
        return this.calories;
    }

    setCalories(calories) {
        this.calories = calories;
        return this;
    }

    getNotes() {
        return this.notes;
    }

    setNotes(notes) {
        this.notes = notes;
        return this;
    }

    getMapPrivacy() {
        return this.mapPrivacy;
    }

    setMapPrivacy(privacy$$1) {
        this.mapPrivacy = privacy$$1;
        return this;
    }

    getWorkoutPrivacy() {
        return this.workoutPrivacy;
    }

    setWorkoutPrivacy(privacy$$1) {
        this.workoutPrivacy = privacy$$1;
        return this;
    }

    getHashtags() {
        return this.hashtags;
    }

    setHashtags(hashtags) {
        this.hashtags = hashtags;
        return this;
    }

    addHashtags(hashtags) {
        hashtags.forEach(hashtag => {
            this.addHashtag(hashtag);
        });

        return this;
    }

    addHashtag(hashtag) {
        if (!this.hasHashtag(hashtag)) {
            this.hashtags.push(hashtag);
        }

        return this;
    }

    hasHashtag(hashtag) {
        return this.hashtags.indexOf(hashtag) !== -1;
    }

    getAvgHeartRate() {
        return this.heartRateAvg;
    }

    setAvgHeartRate(hr) {
        this.heartRateAvg = hr;
        return this;
    }

    getMaxHeartRate() {
        return this.heartRateMax;
    }

    setMaxHeartRate(hr) {
        this.heartRateMax = hr;
        return this;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    getSource() {
        return this.source;
    }

    toString() {
        return [`Workout ${this.getId() || ''}`, `type: ${this.getSportName()}`, `start: ${this.getStart().toFormat('yyyy-MM-dd HH:mm')}`, `distance: ${Math.round(this.getDistance())}km`, `duration: ${Math.round(this.getDuration().as('minutes'))}min`].join('; ');
    }
}



var index$2 = Object.freeze({
	Point: Point,
	Workout: Workout
});

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

class PointFactory {
    static getPointFromApi(point) {
        return new Point(_extends({
            time: luxon.DateTime.fromISO(point.time),
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            distance: point.distance,
            altitude: point.altitude,
            duration: luxon.Duration.fromObject({
                seconds: point.duration
            })
        }, point.sensor_data ? {
            speed: point.sensor_data.speed,
            hr: point.sensor_data.heart_rate,
            cadence: point.sensor_data.cadence
        } : {}));
    }

    static get(time, latitude, longitude, {
        instruction,
        distance,
        duration,
        speed,
        altitude,
        cadence,
        hr
    }) {
        return new Point({
            time,
            latitude,
            longitude,
            altitude,
            hr,
            instruction,
            distance,
            duration,
            speed,
            cadence
        });
    }
}

class WorkoutFactory {
    static getWorkoutFromApi(workout) {
        const { points } = workout;

        return new Workout({
            sportId: workout.sport,
            start: luxon.DateTime.fromISO(workout.local_start_time),
            duration: luxon.Duration.fromObject({
                seconds: workout.duration
            }),
            distance: workout.distance,
            source: workout,
            points: points.points ? points.points.map(point => {
                return PointFactory.getPointFromApi(point);
            }) : [],
            ascent: workout.ascent,
            descent: workout.descent,
            calories: workout.calories,
            notes: workout.message,
            mapPrivacy: workout.show_map,
            workoutPrivacy: workout.show_workout,
            id: workout.id,
            hashtags: workout.hashtags,
            heartRateAvg: workout.heart_rate_avg,
            heartRateMax: workout.heart_rate_max,
            title: workout.title
        });
    }
}



var index$3 = Object.freeze({
	PointFactory: PointFactory,
	WorkoutFactory: WorkoutFactory
});

function serializeCookies(cookies) {
    return Object.keys(cookies).map(name => {
        return cookie.serialize(name, cookies[name]);
    }).join(';');
}

class Api extends dist.Api {

    constructor(csfrtoken = '123456789') {
        super(ENDOMONDO_URL, [new dist.DefaultResponseProcessor(EndomondoApiException)]);
        this.dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ss\'.000Z\'';
        this.csfrtoken = csfrtoken;
        this.setDefaultHeaders({
            'content-type': 'application/json;charset=UTF-8',
            'x-csrf-token': this.csfrtoken,
            cookie: `CSRF_TOKEN=${this.csfrtoken};`
        });
        this.userId = null;
    }

    setUserId(id) {
        this.userId = id;
    }

    getUserId() {
        return this.userId;
    }

    setUserToken(token) {
        this.setDefaultHeader('cookie', serializeCookies({
            CSRF_TOKEN: this.csfrtoken,
            USER_TOKEN: token
        }));
    }

    /**
     * Converting date to string for GET requests.
     *
     * @param date
     * @returns {string}
     */
    getDateString(date) {
        return date.toUTC().toFormat(this.dateFormat);
    }

    /**
     * Get api url for user namespace.
     */
    getUserApiUrl(namespace, userId = this.userId) {
        if (!userId) {
            throw new EndomondoException('User id is not defined');
        }

        return `rest/v1/users/${userId}/${namespace}`;
    }

    /**
     * Get api url for workout namespace.
     */
    getWorkoutsApiUrl(namespace, workoutId, userId) {
        return this.getUserApiUrl(`workouts/${workoutId ? `${workoutId}${namespace ? `/${namespace}` : ''}` : namespace}`, userId);
    }

    /**
     * Log user to Endomondo and set user id and user token.
     *
     * @param email
     * @param password
     * @returns {Promise<string>} return user token
     */
    async login(email, password) {
        const response = await this.post('rest/session', {
            email,
            password,
            remember: true
        });

        const token = cookie.parse(response.source.headers.get('set-cookie')).USER_TOKEN;
        this.setUserId(response.data.id);
        this.setUserToken(token);
        return token;
    }

    async getWorkout(workoutId, userId) {
        const response = await this.get(this.getWorkoutsApiUrl('', workoutId, userId));
        return WorkoutFactory.getWorkoutFromApi(response.data);
    }

    // eslint-disable-next-line complexity
    editWorkout(workout, userId) {
        return this.put(this.getWorkoutsApiUrl('', workout.getId(), userId), _extends({
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            distance: workout.getDistance(),
            start_time: this.getDateString(workout.getStart())
        }, workout.getAvgHeartRate() ? { heart_rate_avg: workout.getAvgHeartRate() } : {}, workout.getMaxHeartRate() ? { heart_rate_max: workout.getMaxHeartRate() } : {}, workout.getTitle() ? { title: workout.getTitle() } : {}, workout.getAscent() ? { ascent: workout.getAscent() } : {}, workout.getDescent() ? { descent: workout.getDescent() } : {}, workout.getNotes() ? { notes: workout.getNotes() } : {}, workout.getMapPrivacy() ? { show_map: workout.getMapPrivacy() } : {}, workout.getWorkoutPrivacy() ? { show_workout: workout.getWorkoutPrivacy() } : {}));
    }

    deleteWorkout(workoutId, userId) {
        return this.delete(this.getWorkoutsApiUrl('', workoutId, userId));
    }

    addHashtag(hashtag, workoutId, userId) {
        return this.post(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    removeHashtag(hashtag, workoutId, userId) {
        return this.delete(this.getWorkoutsApiUrl(`hashtags/${hashtag}`, workoutId, userId));
    }

    async getWorkouts(filter = {}, userId) {
        const {
            after,
            before,
            fromDuration,
            toDuration
        } = filter;

        const response = await this.get(this.getWorkoutsApiUrl('history', null, userId), _extends({}, filter, after instanceof luxon.DateTime ? { after: this.getDateString(after) } : {}, before instanceof luxon.DateTime ? { before: this.getDateString(before) } : {}, fromDuration instanceof luxon.Duration ? { fromDuration: fromDuration.as('seconds') } : {}, toDuration instanceof luxon.Duration ? { fromDuration: toDuration.as('seconds') } : {}));

        return {
            paging: response.data.paging,
            workouts: response.data.data.map(workout => {
                return WorkoutFactory.getWorkoutFromApi(workout);
            })
        };
    }

    async processWorkouts(filter = {}, processor, userId) {
        const { workouts, paging } = await this.getWorkouts(filter, userId);

        const processorPromises = workouts.map(workout => {
            return processor(workout);
        });

        if (workouts.length) {
            const data = queryString.parseUrl(paging.next).query;
            processorPromises.push(...(await this.processWorkouts(data, processor)));
        }

        return Promise.all(processorPromises);
    }
}

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

class MobileApi extends dist.Api {

    constructor() {
        super(ENDOMONDO_MOBILE_URL, [new dist.DefaultResponseProcessor(EndomondoApiException)], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)'
        });
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

        const response = await this.post(`auth${dist.Api.convertParametersToUrl(options)}`);

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
        const response = await this.request(`track${dist.Api.convertParametersToUrl(options)}`, 'POST', {
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
        const dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';

        const data = _extends({
            duration: workout.getDuration().as('seconds'),
            sport: workout.getSportId(),
            distance: workout.getDistance(),
            start_time: workout.getStart().toUTC().toFormat(dataFormat),
            end_time: workout.getStart().toUTC().toFormat(dataFormat),
            extendedResponse: true,
            gzip: true
        }, workout.getCalories() ? { calories: workout.getCalories() } : {}, workout.getNotes() ? { notes: workout.getNotes() } : {}, workout.getMapPrivacy() ? { privacy_map: workout.getMapPrivacy() } : {}, workout.getWorkoutPrivacy() ? { privacy_workout: workout.getWorkoutPrivacy() } : {});

        const options = {
            workoutId: workout.getId(),
            userId: this.getUserId(),
            gzip: true,
            authToken: this.getAuthToken()
        };

        const gzippedBody = await gzipRequestBody(JSON.stringify(data));

        return this.request(`api/workout/post${dist.Api.convertParametersToUrl(options)}`, 'POST', {
            body: gzippedBody
        });
    }
}

/**
 * Recalculate total ascent and descent.
 *
 * @param workout
 * @returns {Workout}
 */
function recalculateAscentDescent(workout) {
    let ascent = 0;
    let descent = 0;
    let previusPoint = null;

    workout.getPoints().forEach(point => {
        if (!previusPoint) {
            previusPoint = point;
            return;
        }

        const altitude = point.getAltitude();
        const previusAltitude = previusPoint.getAltitude();

        if (altitude === null) {
            return;
        }

        if (previusAltitude === null) {
            previusPoint = point;
            return;
        }

        const diff = altitude - previusAltitude;
        if (diff > 0) {
            ascent += diff;
        } else {
            descent -= diff;
        }

        previusPoint = point;
    });

    return workout.setAscent(ascent).setDescent(descent);
}

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
function rewriteWorkoutData(workout, type, getNewValue) {
    const newPoints = [...workout.getPoints()].map(point => {
        const newValue = getNewValue(point);

        if (type === 'altitude') {
            point.setAltitude(newValue);
        } else if (type === 'hr') {
            point.setHeartRate(newValue);
        }

        return point;
    });

    return workout.setPoints(newPoints);
}

function normalizeLocation(loc) {
    return Math.round(loc * 10 ** 6) / 10 ** 6;
}

function rewriteAltitudeData(workout, altitudeData) {
    const newWorkout = rewriteWorkoutData(workout, 'altitude', point => {
        const elevation = altitudeData.find(item => {
            return normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude()) && normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude());
        });
        return elevation ? elevation.elevation : null;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}



var index$4 = Object.freeze({
	recalculateAscentDescent: recalculateAscentDescent,
	replaceWorkout: replaceWorkout,
	rewriteAltitudeData: rewriteAltitudeData
});

exports.Api = Api;
exports.MobileApi = MobileApi;
exports.constants = index;
exports.exceptions = index$1;
exports.factories = index$3;
exports.models = index$2;
exports.tools = index$4;
