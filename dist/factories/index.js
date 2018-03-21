'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var luxon = require('luxon');

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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

var Point = function () {

    // eslint-disable-next-line complexity
    function Point(_ref) {
        var time = _ref.time,
            instruction = _ref.instruction,
            latitude = _ref.latitude,
            longitude = _ref.longitude,
            distance = _ref.distance,
            duration = _ref.duration,
            speed = _ref.speed,
            hr = _ref.hr,
            cadence = _ref.cadence,
            altitude = _ref.altitude;
        classCallCheck(this, Point);

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

    createClass(Point, [{
        key: 'getTime',
        value: function getTime() {
            return this.time;
        }
    }, {
        key: 'setTime',
        value: function setTime(time) {
            this.time = time;
            return this;
        }
    }, {
        key: 'getLatitude',
        value: function getLatitude() {
            return this.latitude;
        }
    }, {
        key: 'setLatitude',
        value: function setLatitude(latitude) {
            this.latitude = latitude;
            return this;
        }
    }, {
        key: 'getLongitude',
        value: function getLongitude() {
            return this.longitude;
        }
    }, {
        key: 'setLongitude',
        value: function setLongitude(longitude) {
            this.longitude = longitude;
            return this;
        }
    }, {
        key: 'getAltitude',
        value: function getAltitude() {
            return this.altitude;
        }
    }, {
        key: 'setAltitude',
        value: function setAltitude(altitude) {
            this.altitude = altitude;
            return this;
        }
    }, {
        key: 'getInstruction',
        value: function getInstruction() {
            return this.instruction;
        }
    }, {
        key: 'setInstruction',
        value: function setInstruction(instruction) {
            this.instruction = instruction;
            return this;
        }
    }, {
        key: 'getDistance',
        value: function getDistance() {
            return this.distance;
        }
    }, {
        key: 'setDistance',
        value: function setDistance(distance) {
            this.distance = distance;
            return this;
        }
    }, {
        key: 'getSpeed',
        value: function getSpeed() {
            return this.speed;
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            this.speed = speed;
            return this;
        }
    }, {
        key: 'getHeartRate',
        value: function getHeartRate() {
            return this.hr;
        }
    }, {
        key: 'setHeartRate',
        value: function setHeartRate(hr) {
            this.hr = hr;
            return this;
        }
    }, {
        key: 'getCadence',
        value: function getCadence() {
            return this.cadence;
        }
    }, {
        key: 'setCadence',
        value: function setCadence(cadence) {
            this.cadence = cadence;
            return this;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return [this.getTime().toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\''), this.getInstruction(), this.getLatitude(), this.getLongitude(), this.getDistance(), this.getSpeed(), this.getAltitude(), this.getHeartRate(), this.getCadence(), ''].map(function (item) {
                return item === null ? '' : item;
            }).join(';');
        }
    }]);
    return Point;
}();

var RUNNING = 0;
var CYCLING_TRANSPORT = 1;
var CYCLING_SPORT = 2;
var MOUNTAIN_BIKINGS = 3;
var SKATING = 4;
var ROLLER_SKIING = 5;
var SKIING_CROSS_COUNTRY = 6;
var SKIING_DOWNHILL = 7;
var SNOWBOARDING = 8;
var KAYAKING = 9;
var KITE_SURFING = 10;
var ROWING = 11;
var SAILING = 12;
var WINDSURFING = 13;
var FINTESS_WALKING = 14;
var GOLFING = 15;
var HIKING = 16;
var ORIENTEERING = 17;
var WALKING = 18;
var RIDING = 19;
var SWIMMING = 20;
var CYCLING_INDOOR = 21;
var OTHER = 22;
var AEROBICS = 23;
var BADMINTON = 24;
var BASEBALL = 25;
var BASKETBALL = 26;
var BOXING = 27;
var CLIMBING_STAIRS = 28;
var CRICKET = 29;
var ELLIPTICAL_TRAINING = 30;
var DANCING = 31;
var FENCING = 32;
var FOOTBALL_AMERICAN = 33;
var FOOTBALL_RUGBY = 34;
var FOOTBALL_SOCCER = 35;
var HANDBALL = 36;
var HOCKEY = 37;
var PILATES = 38;
var POLO = 39;
var SCUBA_DIVING = 40;
var SQUASH = 41;
var TABLE_TENIS = 42;
var TENNIS = 43;
var VOLEYBALL_BEACH = 44;
var VOLEYBALL_INDOOR = 45;
var WEIGHT_TRAINING = 46;
var YOGA = 47;
var MARTINAL_ARTS = 48;
var GYMNASTICS = 49;
var STEP_COUNTER = 50;
var CIRKUIT_TRAINING = 87;
var RUNNING_TREADMILL = 88;
var SKATEBOARDING = 89;
var SURFING = 90;
var SNOWSHOEING = 91;
var WHEELCHAIR = 92;
var CLIMBING = 93;
var WALKING_TREADMILL = 94;
var KICK_SCOOTER = 95;
var STAND_UP_PADDLING = 96;
var TRAIL_RUNNING = 97;
var ROWING_INDOORS = 98;
var FLOORBALL = 99;
var ICE_SKATING = 100;
var SKI_TOURING = 101;
var ROPE_JUMPING = 102;
var STRETCHING = 103;
var CANICROSS = 104;
var PADDLE_TENNIS = 105;
var PARAGLIDING = 106;

var _names;

var names = (_names = {}, defineProperty(_names, RUNNING, 'Running'), defineProperty(_names, CYCLING_TRANSPORT, 'Cycling, transport'), defineProperty(_names, CYCLING_SPORT, 'Cycling, sport'), defineProperty(_names, MOUNTAIN_BIKINGS, 'Mountain biking'), defineProperty(_names, SKATING, 'Skating'), defineProperty(_names, ROLLER_SKIING, 'Roller skiing'), defineProperty(_names, SKIING_CROSS_COUNTRY, 'Skiing, cross country'), defineProperty(_names, SKIING_DOWNHILL, 'Skiing, downhill'), defineProperty(_names, SNOWBOARDING, 'Snowboarding'), defineProperty(_names, KAYAKING, 'Kayaking'), defineProperty(_names, KITE_SURFING, 'Kite surfing'), defineProperty(_names, ROWING, 'Rowing'), defineProperty(_names, SAILING, 'Sailing'), defineProperty(_names, WINDSURFING, 'Windsurfing'), defineProperty(_names, FINTESS_WALKING, 'Fitness walking'), defineProperty(_names, GOLFING, 'Golfing'), defineProperty(_names, HIKING, 'Hiking'), defineProperty(_names, ORIENTEERING, 'Orienteering'), defineProperty(_names, WALKING, 'Walking'), defineProperty(_names, RIDING, 'Riding'), defineProperty(_names, SWIMMING, 'Swimming'), defineProperty(_names, CYCLING_INDOOR, 'Cycling, Indoor'), defineProperty(_names, OTHER, 'Other'), defineProperty(_names, AEROBICS, 'Aerobics'), defineProperty(_names, BADMINTON, 'Badminton'), defineProperty(_names, BASEBALL, 'Baseball'), defineProperty(_names, BASKETBALL, 'Basketball'), defineProperty(_names, BOXING, 'Boxing'), defineProperty(_names, CLIMBING_STAIRS, 'Climbing stairs'), defineProperty(_names, CRICKET, 'Cricket'), defineProperty(_names, ELLIPTICAL_TRAINING, 'Elliptical training'), defineProperty(_names, DANCING, 'Dancing'), defineProperty(_names, FENCING, 'Fencing'), defineProperty(_names, FOOTBALL_AMERICAN, 'Football, American'), defineProperty(_names, FOOTBALL_RUGBY, 'Football, rugby'), defineProperty(_names, FOOTBALL_SOCCER, 'Football, soccer'), defineProperty(_names, HANDBALL, 'Handball'), defineProperty(_names, HOCKEY, 'Hockey'), defineProperty(_names, PILATES, 'Pilates'), defineProperty(_names, POLO, 'Polo'), defineProperty(_names, SCUBA_DIVING, 'Scuba diving'), defineProperty(_names, SQUASH, 'Squash'), defineProperty(_names, TABLE_TENIS, 'Table tennis'), defineProperty(_names, TENNIS, 'Tennis'), defineProperty(_names, VOLEYBALL_BEACH, 'Volleyball, beach'), defineProperty(_names, VOLEYBALL_INDOOR, 'Volleyball, indoor'), defineProperty(_names, WEIGHT_TRAINING, 'Weight training'), defineProperty(_names, YOGA, 'Yoga'), defineProperty(_names, MARTINAL_ARTS, 'Martial arts'), defineProperty(_names, GYMNASTICS, 'Gymnastics'), defineProperty(_names, STEP_COUNTER, 'Step counter'), defineProperty(_names, CIRKUIT_TRAINING, 'Circuit Training'), defineProperty(_names, SKATEBOARDING, 'Skateboarding'), defineProperty(_names, CLIMBING, 'Climbing'), defineProperty(_names, KICK_SCOOTER, 'Kick scooter'), defineProperty(_names, CANICROSS, 'Canicross'), defineProperty(_names, FLOORBALL, 'Floorball'), defineProperty(_names, ICE_SKATING, 'Ice skating'), defineProperty(_names, RUNNING_TREADMILL, 'Running (Treadmill)'), defineProperty(_names, SURFING, 'Surfing'), defineProperty(_names, SNOWSHOEING, 'Showshoeing'), defineProperty(_names, WHEELCHAIR, 'Wheelchair'), defineProperty(_names, WALKING_TREADMILL, 'Walking (Treadmill)'), defineProperty(_names, STAND_UP_PADDLING, 'Stand up paddling'), defineProperty(_names, TRAIL_RUNNING, 'Trail running'), defineProperty(_names, ROWING_INDOORS, 'Rowing (indoors)'), defineProperty(_names, SKI_TOURING, 'Ski touring'), defineProperty(_names, ROPE_JUMPING, 'Rope jumping'), defineProperty(_names, STRETCHING, 'Stretching'), defineProperty(_names, PADDLE_TENNIS, 'Paddle tennis'), defineProperty(_names, PARAGLIDING, 'Paragliding'), _names);

var Workout = function () {

    // eslint-disable-next-line complexity
    function Workout(_ref) {
        var sportId = _ref.sportId,
            start = _ref.start,
            duration = _ref.duration,
            distance = _ref.distance,
            source = _ref.source,
            points = _ref.points,
            ascent = _ref.ascent,
            descent = _ref.descent,
            calories = _ref.calories,
            notes = _ref.notes,
            mapPrivacy = _ref.mapPrivacy,
            workoutPrivacy = _ref.workoutPrivacy,
            id = _ref.id,
            hashtags = _ref.hashtags,
            heartRateAvg = _ref.heartRateAvg,
            heartRateMax = _ref.heartRateMax,
            title = _ref.title;
        classCallCheck(this, Workout);

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

    createClass(Workout, [{
        key: 'getId',
        value: function getId() {
            return this.id;
        }
    }, {
        key: 'setId',
        value: function setId(id) {
            this.id = id;
            return this;
        }
    }, {
        key: 'getSportId',
        value: function getSportId() {
            return this.sportId;
        }
    }, {
        key: 'setSportId',
        value: function setSportId(sportId) {
            this.sportId = sportId;
            return this;
        }
    }, {
        key: 'getSportName',
        value: function getSportName() {
            return names[this.getSportId()];
        }
    }, {
        key: 'getStart',
        value: function getStart() {
            return this.start;
        }
    }, {
        key: 'setStart',
        value: function setStart(start) {
            this.start = start;
            return this;
        }
    }, {
        key: 'getEnd',
        value: function getEnd() {
            var points = this.getPoints();

            if (points) {
                return points[points.length - 1].getTime();
            }

            return this.getStart().plus(this.getDuration());
        }
    }, {
        key: 'getDuration',
        value: function getDuration() {
            return this.duration;
        }
    }, {
        key: 'setDuration',
        value: function setDuration(duration) {
            this.duration = duration;
            return this;
        }
    }, {
        key: 'getDistance',
        value: function getDistance() {
            return this.distance;
        }
    }, {
        key: 'setDistance',
        value: function setDistance(distance) {
            this.distance = distance;
            return this;
        }
    }, {
        key: 'getPoints',
        value: function getPoints() {
            return this.points;
        }
    }, {
        key: 'setPoints',
        value: function setPoints(points) {
            this.points = points;
            return this;
        }
    }, {
        key: 'getAscent',
        value: function getAscent() {
            return this.ascent;
        }
    }, {
        key: 'setAscent',
        value: function setAscent(ascent) {
            this.ascent = ascent;
            return this;
        }
    }, {
        key: 'getDescent',
        value: function getDescent() {
            return this.descent;
        }
    }, {
        key: 'setDescent',
        value: function setDescent(descent) {
            this.descent = descent;
            return this;
        }
    }, {
        key: 'getCalories',
        value: function getCalories() {
            return this.calories;
        }
    }, {
        key: 'setCalories',
        value: function setCalories(calories) {
            this.calories = calories;
            return this;
        }
    }, {
        key: 'getNotes',
        value: function getNotes() {
            return this.notes;
        }
    }, {
        key: 'setNotes',
        value: function setNotes(notes) {
            this.notes = notes;
            return this;
        }
    }, {
        key: 'getMapPrivacy',
        value: function getMapPrivacy() {
            return this.mapPrivacy;
        }
    }, {
        key: 'setMapPrivacy',
        value: function setMapPrivacy(privacy$$1) {
            this.mapPrivacy = privacy$$1;
            return this;
        }
    }, {
        key: 'getWorkoutPrivacy',
        value: function getWorkoutPrivacy() {
            return this.workoutPrivacy;
        }
    }, {
        key: 'setWorkoutPrivacy',
        value: function setWorkoutPrivacy(privacy$$1) {
            this.workoutPrivacy = privacy$$1;
            return this;
        }
    }, {
        key: 'getHashtags',
        value: function getHashtags() {
            return this.hashtags;
        }
    }, {
        key: 'setHashtags',
        value: function setHashtags(hashtags) {
            this.hashtags = hashtags;
            return this;
        }
    }, {
        key: 'addHashtags',
        value: function addHashtags(hashtags) {
            var _this = this;

            hashtags.forEach(function (hashtag) {
                _this.addHashtag(hashtag);
            });

            return this;
        }
    }, {
        key: 'addHashtag',
        value: function addHashtag(hashtag) {
            if (!this.hasHashtag(hashtag)) {
                this.hashtags.push(hashtag);
            }

            return this;
        }
    }, {
        key: 'hasHashtag',
        value: function hasHashtag(hashtag) {
            return this.hashtags.indexOf(hashtag) !== -1;
        }
    }, {
        key: 'getAvgHeartRate',
        value: function getAvgHeartRate() {
            return this.heartRateAvg;
        }
    }, {
        key: 'setAvgHeartRate',
        value: function setAvgHeartRate(hr) {
            this.heartRateAvg = hr;
            return this;
        }
    }, {
        key: 'getMaxHeartRate',
        value: function getMaxHeartRate() {
            return this.heartRateMax;
        }
    }, {
        key: 'setMaxHeartRate',
        value: function setMaxHeartRate(hr) {
            this.heartRateMax = hr;
            return this;
        }
    }, {
        key: 'getTitle',
        value: function getTitle() {
            return this.title;
        }
    }, {
        key: 'setTitle',
        value: function setTitle(title) {
            this.title = title;
            return this;
        }
    }, {
        key: 'getSource',
        value: function getSource() {
            return this.source;
        }
    }, {
        key: 'toString',
        value: function toString() {
            return ['Workout ' + (this.getId() || ''), 'type: ' + this.getSportName(), 'start: ' + this.getStart().toFormat('yyyy-MM-dd HH:mm'), 'distance: ' + Math.round(this.getDistance()) + 'km', 'duration: ' + Math.round(this.getDuration().as('minutes')) + 'min'].join('; ');
        }
    }]);
    return Workout;
}();

var PointFactory = function () {
    function PointFactory() {
        classCallCheck(this, PointFactory);
    }

    createClass(PointFactory, null, [{
        key: 'getPointFromApi',
        value: function getPointFromApi(point) {
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
    }, {
        key: 'get',
        value: function get$$1(time, latitude, longitude, _ref) {
            var instruction = _ref.instruction,
                distance = _ref.distance,
                duration = _ref.duration,
                speed = _ref.speed,
                altitude = _ref.altitude,
                cadence = _ref.cadence,
                hr = _ref.hr;

            return new Point({
                time: time,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                hr: hr,
                instruction: instruction,
                distance: distance,
                duration: duration,
                speed: speed,
                cadence: cadence
            });
        }
    }]);
    return PointFactory;
}();

var WorkoutFactory = function () {
    function WorkoutFactory() {
        classCallCheck(this, WorkoutFactory);
    }

    createClass(WorkoutFactory, null, [{
        key: 'getWorkoutFromApi',
        value: function getWorkoutFromApi(workout) {
            var points = workout.points;


            return new Workout({
                sportId: workout.sport,
                start: luxon.DateTime.fromISO(workout.local_start_time),
                duration: luxon.Duration.fromObject({
                    seconds: workout.duration
                }),
                distance: workout.distance,
                source: workout,
                points: points.points ? points.points.map(function (point) {
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
    }]);
    return WorkoutFactory;
}();

exports.PointFactory = PointFactory;
exports.WorkoutFactory = WorkoutFactory;
