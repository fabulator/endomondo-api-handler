'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var zlib = _interopDefault(require('zlib'));
var dist = require('rest-api-handler/dist');

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

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



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var EndomondoException = function (_Error) {
    inherits(EndomondoException, _Error);

    function EndomondoException(message) {
        classCallCheck(this, EndomondoException);
        return possibleConstructorReturn(this, (EndomondoException.__proto__ || Object.getPrototypeOf(EndomondoException)).call(this, "Endomondo Error: " + message));
    }

    return EndomondoException;
}(Error);

/**
 * Endomondo API Exception
 */

var EndomondoApiException = function (_EndomondoException) {
    inherits(EndomondoApiException, _EndomondoException);

    /**
     * Constructor.
     */
    function EndomondoApiException(response, request) {
        classCallCheck(this, EndomondoApiException);

        var _this = possibleConstructorReturn(this, (EndomondoApiException.__proto__ || Object.getPrototypeOf(EndomondoApiException)).call(this, JSON.stringify(response.data)));

        _this.response = response;
        _this.request = request;
        return _this;
    }

    return EndomondoApiException;
}(EndomondoException);

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

var ENDOMONDO_MOBILE_URL = 'https://api.mobile.endomondo.com/mobile';

function processStringResponse(response) {
    var data = {};

    response.split('\n').map(function (item) {
        return item.split('=');
    }).filter(function (item) {
        return item.length === 2;
    }).forEach(function (item) {
        var _item = slicedToArray(item, 2),
            key = _item[0],
            value = _item[1];

        data[key] = value;
    });

    return data;
}

function gzipRequestBody(body) {
    return new Promise(function (resolve, reject) {
        zlib.gzip(body, function (error, buffer) {
            if (error) {
                reject(error);
                return;
            }

            resolve(buffer);
        });
    });
}

var MobileApi = function (_Api) {
    inherits(MobileApi, _Api);

    function MobileApi() {
        classCallCheck(this, MobileApi);
        return possibleConstructorReturn(this, (MobileApi.__proto__ || Object.getPrototypeOf(MobileApi)).call(this, ENDOMONDO_MOBILE_URL, [new dist.DefaultResponseProcessor(EndomondoApiException)], {
            'Content-Type': 'application/octet-stream',
            'User-Agent': 'Dalvik/1.4.0 (Linux; U; Android 4.1; GT-B5512 Build/GINGERBREAD)'
        }));
    }

    createClass(MobileApi, [{
        key: 'getAuthToken',
        value: function getAuthToken() {
            return this.authToken;
        }
    }, {
        key: 'setAuthToken',
        value: function setAuthToken(authToken) {
            this.authToken = authToken;
        }
    }, {
        key: 'getUserId',
        value: function getUserId() {
            return this.userId;
        }
    }, {
        key: 'setUserId',
        value: function setUserId(id) {
            this.userId = id;
        }
    }, {
        key: 'login',
        value: function () {
            var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
                var options, response, _processStringRespons, userId, authToken;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                options = {
                                    email: email,
                                    password: password,
                                    country: '',
                                    deviceId: null,
                                    action: 'PAIR'
                                };
                                _context.next = 3;
                                return this.post('auth' + dist.Api.convertParametersToUrl(options));

                            case 3:
                                response = _context.sent;
                                _processStringRespons = processStringResponse(response.data), userId = _processStringRespons.userId, authToken = _processStringRespons.authToken;


                                this.setUserId(Number(userId));
                                this.setAuthToken(authToken);
                                return _context.abrupt('return', authToken);

                            case 8:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function login(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return login;
        }()

        /**
         * Create Endomono workout.
         *
         * @param workout
         * @returns {Promise<number>} return id of new workout
         */

    }, {
        key: 'createWorkout',
        value: function () {
            var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(workout) {
                var options, gzippedBody, response, workoutId;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                options = {
                                    workoutId: '-' + 'XXXXXXXXXXXXXXXX'.split('X').map(function () {
                                        return Math.floor(Math.random() * 9);
                                    }).join(''),
                                    duration: workout.getDuration().as('seconds'),
                                    sport: workout.getSportId(),
                                    extendedResponse: true,
                                    gzip: true,
                                    authToken: this.getAuthToken()
                                };
                                _context2.next = 3;
                                return gzipRequestBody(workout.getPoints().map(function (point) {
                                    return point.toString();
                                }).join('\n'));

                            case 3:
                                gzippedBody = _context2.sent;
                                _context2.next = 6;
                                return this.request('track' + dist.Api.convertParametersToUrl(options), 'POST', {
                                    body: gzippedBody
                                });

                            case 6:
                                response = _context2.sent;
                                workoutId = processStringResponse(response.data)['workout.id'];

                                if (workoutId) {
                                    _context2.next = 10;
                                    break;
                                }

                                throw EndomondoException('Error while creating workout. Endomondo did not returned workout id.');

                            case 10:
                                _context2.next = 12;
                                return this.updateWorkout(workout.setId(workoutId));

                            case 12:
                                return _context2.abrupt('return', workoutId);

                            case 13:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function createWorkout(_x3) {
                return _ref2.apply(this, arguments);
            }

            return createWorkout;
        }()
    }, {
        key: 'updateWorkout',
        value: function () {
            var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(workout) {
                var dataFormat, data, options, gzippedBody;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                dataFormat = 'yyyy-MM-dd HH:mm:ss \'UTC\'';
                                data = _extends({
                                    duration: workout.getDuration().as('seconds'),
                                    sport: workout.getSportId(),
                                    distance: workout.getDistance(),
                                    start_time: workout.getStart().toUTC().toFormat(dataFormat),
                                    end_time: workout.getStart().toUTC().toFormat(dataFormat),
                                    extendedResponse: true,
                                    gzip: true
                                }, workout.getCalories() ? { calories: workout.getCalories() } : {}, workout.getNotes() ? { notes: workout.getNotes() } : {}, workout.getMapPrivacy() ? { privacy_map: workout.getMapPrivacy() } : {}, workout.getWorkoutPrivacy() ? { privacy_workout: workout.getWorkoutPrivacy() } : {});
                                options = {
                                    workoutId: workout.getId(),
                                    userId: this.getUserId(),
                                    gzip: true,
                                    authToken: this.getAuthToken()
                                };
                                _context3.next = 5;
                                return gzipRequestBody(JSON.stringify(data));

                            case 5:
                                gzippedBody = _context3.sent;
                                return _context3.abrupt('return', this.request('api/workout/post' + dist.Api.convertParametersToUrl(options), 'POST', {
                                    body: gzippedBody
                                }));

                            case 7:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function updateWorkout(_x4) {
                return _ref3.apply(this, arguments);
            }

            return updateWorkout;
        }()
    }]);
    return MobileApi;
}(dist.Api);

module.exports = MobileApi;
