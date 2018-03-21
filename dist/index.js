'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var luxon = require('luxon');
var cookie = _interopDefault(require('cookie'));
var queryString = _interopDefault(require('query-string'));
var dist = require('rest-api-handler/dist');
var zlib = _interopDefault(require('zlib'));

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jsx = function () {
  var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7;
  return function createRawReactElement(type, props, key, children) {
    var defaultProps = type && type.defaultProps;
    var childrenLength = arguments.length - 3;

    if (!props && childrenLength !== 0) {
      props = {};
    }

    if (props && defaultProps) {
      for (var propName in defaultProps) {
        if (props[propName] === void 0) {
          props[propName] = defaultProps[propName];
        }
      }
    } else if (!props) {
      props = defaultProps || {};
    }

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 3];
      }

      props.children = childArray;
    }

    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: type,
      key: key === undefined ? null : '' + key,
      ref: null,
      props: props,
      _owner: null
    };
  };
}();

var asyncIterator = function (iterable) {
  if (typeof Symbol === "function") {
    if (Symbol.asyncIterator) {
      var method = iterable[Symbol.asyncIterator];
      if (method != null) return method.call(iterable);
    }

    if (Symbol.iterator) {
      return iterable[Symbol.iterator]();
    }
  }

  throw new TypeError("Object is not async iterable");
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var asyncGeneratorDelegate = function (inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  

  if (typeof Symbol === "function" && Symbol.iterator) {
    iter[Symbol.iterator] = function () {
      return this;
    };
  }

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner.throw === "function") {
    iter.throw = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner.return === "function") {
    iter.return = function (value) {
      return pump("return", value);
    };
  }

  return iter;
};

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

var defineEnumerableProperties = function (obj, descs) {
  for (var key in descs) {
    var desc = descs[key];
    desc.configurable = desc.enumerable = true;
    if ("value" in desc) desc.writable = true;
    Object.defineProperty(obj, key, desc);
  }

  return obj;
};

var defaults = function (obj, defaults) {
  var keys = Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

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

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
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

var _instanceof = function (left, right) {
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

var interopRequireDefault = function (obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
};

var interopRequireWildcard = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj.default = obj;
    return newObj;
  }
};

var newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

var objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var selfGlobal = typeof global === "undefined" ? self : global;

var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
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

var slicedToArrayLoose = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];

    for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};

var taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

var temporalRef = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  } else {
    return val;
  }
};

var temporalUndefined = {};

var toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};




var babelHelpers = Object.freeze({
	jsx: jsx,
	asyncIterator: asyncIterator,
	asyncGenerator: asyncGenerator,
	asyncGeneratorDelegate: asyncGeneratorDelegate,
	asyncToGenerator: asyncToGenerator,
	classCallCheck: classCallCheck,
	createClass: createClass,
	defineEnumerableProperties: defineEnumerableProperties,
	defaults: defaults,
	defineProperty: defineProperty,
	get: get,
	inherits: inherits,
	interopRequireDefault: interopRequireDefault,
	interopRequireWildcard: interopRequireWildcard,
	newArrowCheck: newArrowCheck,
	objectDestructuringEmpty: objectDestructuringEmpty,
	objectWithoutProperties: objectWithoutProperties,
	possibleConstructorReturn: possibleConstructorReturn,
	selfGlobal: selfGlobal,
	set: set,
	slicedToArray: slicedToArray,
	slicedToArrayLoose: slicedToArrayLoose,
	taggedTemplateLiteral: taggedTemplateLiteral,
	taggedTemplateLiteralLoose: taggedTemplateLiteralLoose,
	temporalRef: temporalRef,
	temporalUndefined: temporalUndefined,
	toArray: toArray,
	toConsumableArray: toConsumableArray,
	typeof: _typeof,
	extends: _extends,
	instanceof: _instanceof
});

var _names;

var names = (_names = {}, defineProperty(_names, RUNNING, 'Running'), defineProperty(_names, CYCLING_TRANSPORT, 'Cycling, transport'), defineProperty(_names, CYCLING_SPORT, 'Cycling, sport'), defineProperty(_names, MOUNTAIN_BIKINGS, 'Mountain biking'), defineProperty(_names, SKATING, 'Skating'), defineProperty(_names, ROLLER_SKIING, 'Roller skiing'), defineProperty(_names, SKIING_CROSS_COUNTRY, 'Skiing, cross country'), defineProperty(_names, SKIING_DOWNHILL, 'Skiing, downhill'), defineProperty(_names, SNOWBOARDING, 'Snowboarding'), defineProperty(_names, KAYAKING, 'Kayaking'), defineProperty(_names, KITE_SURFING, 'Kite surfing'), defineProperty(_names, ROWING, 'Rowing'), defineProperty(_names, SAILING, 'Sailing'), defineProperty(_names, WINDSURFING, 'Windsurfing'), defineProperty(_names, FINTESS_WALKING, 'Fitness walking'), defineProperty(_names, GOLFING, 'Golfing'), defineProperty(_names, HIKING, 'Hiking'), defineProperty(_names, ORIENTEERING, 'Orienteering'), defineProperty(_names, WALKING, 'Walking'), defineProperty(_names, RIDING, 'Riding'), defineProperty(_names, SWIMMING, 'Swimming'), defineProperty(_names, CYCLING_INDOOR, 'Cycling, Indoor'), defineProperty(_names, OTHER, 'Other'), defineProperty(_names, AEROBICS, 'Aerobics'), defineProperty(_names, BADMINTON, 'Badminton'), defineProperty(_names, BASEBALL, 'Baseball'), defineProperty(_names, BASKETBALL, 'Basketball'), defineProperty(_names, BOXING, 'Boxing'), defineProperty(_names, CLIMBING_STAIRS, 'Climbing stairs'), defineProperty(_names, CRICKET, 'Cricket'), defineProperty(_names, ELLIPTICAL_TRAINING, 'Elliptical training'), defineProperty(_names, DANCING, 'Dancing'), defineProperty(_names, FENCING, 'Fencing'), defineProperty(_names, FOOTBALL_AMERICAN, 'Football, American'), defineProperty(_names, FOOTBALL_RUGBY, 'Football, rugby'), defineProperty(_names, FOOTBALL_SOCCER, 'Football, soccer'), defineProperty(_names, HANDBALL, 'Handball'), defineProperty(_names, HOCKEY, 'Hockey'), defineProperty(_names, PILATES, 'Pilates'), defineProperty(_names, POLO, 'Polo'), defineProperty(_names, SCUBA_DIVING, 'Scuba diving'), defineProperty(_names, SQUASH, 'Squash'), defineProperty(_names, TABLE_TENIS, 'Table tennis'), defineProperty(_names, TENNIS, 'Tennis'), defineProperty(_names, VOLEYBALL_BEACH, 'Volleyball, beach'), defineProperty(_names, VOLEYBALL_INDOOR, 'Volleyball, indoor'), defineProperty(_names, WEIGHT_TRAINING, 'Weight training'), defineProperty(_names, YOGA, 'Yoga'), defineProperty(_names, MARTINAL_ARTS, 'Martial arts'), defineProperty(_names, GYMNASTICS, 'Gymnastics'), defineProperty(_names, STEP_COUNTER, 'Step counter'), defineProperty(_names, CIRKUIT_TRAINING, 'Circuit Training'), defineProperty(_names, SKATEBOARDING, 'Skateboarding'), defineProperty(_names, CLIMBING, 'Climbing'), defineProperty(_names, KICK_SCOOTER, 'Kick scooter'), defineProperty(_names, CANICROSS, 'Canicross'), defineProperty(_names, FLOORBALL, 'Floorball'), defineProperty(_names, ICE_SKATING, 'Ice skating'), defineProperty(_names, RUNNING_TREADMILL, 'Running (Treadmill)'), defineProperty(_names, SURFING, 'Surfing'), defineProperty(_names, SNOWSHOEING, 'Showshoeing'), defineProperty(_names, WHEELCHAIR, 'Wheelchair'), defineProperty(_names, WALKING_TREADMILL, 'Walking (Treadmill)'), defineProperty(_names, STAND_UP_PADDLING, 'Stand up paddling'), defineProperty(_names, TRAIL_RUNNING, 'Trail running'), defineProperty(_names, ROWING_INDOORS, 'Rowing (indoors)'), defineProperty(_names, SKI_TOURING, 'Ski touring'), defineProperty(_names, ROPE_JUMPING, 'Rope jumping'), defineProperty(_names, STRETCHING, 'Stretching'), defineProperty(_names, PADDLE_TENNIS, 'Paddle tennis'), defineProperty(_names, PARAGLIDING, 'Paragliding'), _names);

var PRIVACY_EVERYONE = 0;
var PRIVACY_FRIENDS = 1;
var PRIVACY_ME = 2;

var privacy = Object.freeze({
	PRIVACY_EVERYONE: PRIVACY_EVERYONE,
	PRIVACY_FRIENDS: PRIVACY_FRIENDS,
	PRIVACY_ME: PRIVACY_ME
});

var ENDOMONDO_URL = 'https://www.endomondo.com';
var ENDOMONDO_MOBILE_URL = 'https://api.mobile.endomondo.com/mobile';



var index = Object.freeze({
	ENDOMONDO_URL: ENDOMONDO_URL,
	ENDOMONDO_MOBILE_URL: ENDOMONDO_MOBILE_URL,
	SPORTS: sports,
	SPORT_NAMES: names,
	PRIVACY: privacy
});

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



var index$1 = Object.freeze({
	EndomondoException: EndomondoException,
	EndomondoApiException: EndomondoApiException
});

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



var index$2 = Object.freeze({
	Point: Point,
	Workout: Workout
});

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



var index$3 = Object.freeze({
	PointFactory: PointFactory,
	WorkoutFactory: WorkoutFactory
});

function serializeCookies(cookies) {
    return Object.keys(cookies).map(function (name) {
        return cookie.serialize(name, cookies[name]);
    }).join(';');
}

var Api = function (_ApiHandler) {
    inherits(Api, _ApiHandler);

    function Api() {
        var csfrtoken = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '123456789';
        classCallCheck(this, Api);

        var _this = possibleConstructorReturn(this, (Api.__proto__ || Object.getPrototypeOf(Api)).call(this, ENDOMONDO_URL, [new dist.DefaultResponseProcessor(EndomondoApiException)]));

        _this.dateFormat = 'yyyy-MM-dd\'T\'HH:mm:ss\'.000Z\'';

        _this.csfrtoken = csfrtoken;
        _this.setDefaultHeaders({
            'content-type': 'application/json;charset=UTF-8',
            'x-csrf-token': _this.csfrtoken,
            cookie: 'CSRF_TOKEN=' + _this.csfrtoken + ';'
        });
        _this.userId = null;
        return _this;
    }

    createClass(Api, [{
        key: 'setUserId',
        value: function setUserId(id) {
            this.userId = id;
        }
    }, {
        key: 'getUserId',
        value: function getUserId() {
            return this.userId;
        }
    }, {
        key: 'setUserToken',
        value: function setUserToken(token) {
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

    }, {
        key: 'getDateString',
        value: function getDateString(date) {
            return date.toUTC().toFormat(this.dateFormat);
        }

        /**
         * Get api url for user namespace.
         */

    }, {
        key: 'getUserApiUrl',
        value: function getUserApiUrl(namespace) {
            var userId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.userId;

            if (!userId) {
                throw new EndomondoException('User id is not defined');
            }

            return 'rest/v1/users/' + userId + '/' + namespace;
        }

        /**
         * Get api url for workout namespace.
         */

    }, {
        key: 'getWorkoutsApiUrl',
        value: function getWorkoutsApiUrl(namespace, workoutId, userId) {
            return this.getUserApiUrl('workouts/' + (workoutId ? '' + workoutId + (namespace ? '/' + namespace : '') : namespace), userId);
        }

        /**
         * Log user to Endomondo and set user id and user token.
         *
         * @param email
         * @param password
         * @returns {Promise<string>} return user token
         */

    }, {
        key: 'login',
        value: function () {
            var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {
                var response, token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.post('rest/session', {
                                    email: email,
                                    password: password,
                                    remember: true
                                });

                            case 2:
                                response = _context.sent;
                                token = cookie.parse(response.source.headers.get('set-cookie')).USER_TOKEN;

                                this.setUserId(response.data.id);
                                this.setUserToken(token);
                                return _context.abrupt('return', token);

                            case 7:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function login(_x3, _x4) {
                return _ref.apply(this, arguments);
            }

            return login;
        }()
    }, {
        key: 'getWorkout',
        value: function () {
            var _ref2 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(workoutId, userId) {
                var response;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.get(this.getWorkoutsApiUrl('', workoutId, userId));

                            case 2:
                                response = _context2.sent;
                                return _context2.abrupt('return', WorkoutFactory.getWorkoutFromApi(response.data));

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getWorkout(_x5, _x6) {
                return _ref2.apply(this, arguments);
            }

            return getWorkout;
        }()

        // eslint-disable-next-line complexity

    }, {
        key: 'editWorkout',
        value: function editWorkout(workout, userId) {
            return this.put(this.getWorkoutsApiUrl('', workout.getId(), userId), _extends({
                duration: workout.getDuration().as('seconds'),
                sport: workout.getSportId(),
                distance: workout.getDistance(),
                start_time: this.getDateString(workout.getStart())
            }, workout.getAvgHeartRate() ? { heart_rate_avg: workout.getAvgHeartRate() } : {}, workout.getMaxHeartRate() ? { heart_rate_max: workout.getMaxHeartRate() } : {}, workout.getTitle() ? { title: workout.getTitle() } : {}, workout.getAscent() ? { ascent: workout.getAscent() } : {}, workout.getDescent() ? { descent: workout.getDescent() } : {}, workout.getNotes() ? { notes: workout.getNotes() } : {}, workout.getMapPrivacy() ? { show_map: workout.getMapPrivacy() } : {}, workout.getWorkoutPrivacy() ? { show_workout: workout.getWorkoutPrivacy() } : {}));
        }
    }, {
        key: 'deleteWorkout',
        value: function deleteWorkout(workoutId, userId) {
            return this.delete(this.getWorkoutsApiUrl('', workoutId, userId));
        }
    }, {
        key: 'addHashtag',
        value: function addHashtag(hashtag, workoutId, userId) {
            return this.post(this.getWorkoutsApiUrl('hashtags/' + hashtag, workoutId, userId));
        }
    }, {
        key: 'removeHashtag',
        value: function removeHashtag(hashtag, workoutId, userId) {
            return this.delete(this.getWorkoutsApiUrl('hashtags/' + hashtag, workoutId, userId));
        }
    }, {
        key: 'getWorkouts',
        value: function () {
            var _ref3 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var userId = arguments[1];
                var after, before, fromDuration, toDuration, response;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                after = filter.after, before = filter.before, fromDuration = filter.fromDuration, toDuration = filter.toDuration;
                                _context3.next = 3;
                                return this.get(this.getWorkoutsApiUrl('history', null, userId), _extends({}, filter, after instanceof luxon.DateTime ? { after: this.getDateString(after) } : {}, before instanceof luxon.DateTime ? { before: this.getDateString(before) } : {}, fromDuration instanceof luxon.Duration ? { fromDuration: fromDuration.as('seconds') } : {}, toDuration instanceof luxon.Duration ? { fromDuration: toDuration.as('seconds') } : {}));

                            case 3:
                                response = _context3.sent;
                                return _context3.abrupt('return', {
                                    paging: response.data.paging,
                                    workouts: response.data.data.map(function (workout) {
                                        return WorkoutFactory.getWorkoutFromApi(workout);
                                    })
                                });

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function getWorkouts() {
                return _ref3.apply(this, arguments);
            }

            return getWorkouts;
        }()
    }, {
        key: 'processWorkouts',
        value: function () {
            var _ref4 = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var processor = arguments[1];
                var userId = arguments[2];

                var _ref5, workouts, paging, processorPromises, data;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return this.getWorkouts(filter, userId);

                            case 2:
                                _ref5 = _context4.sent;
                                workouts = _ref5.workouts;
                                paging = _ref5.paging;
                                processorPromises = workouts.map(function (workout) {
                                    return processor(workout);
                                });

                                if (!workouts.length) {
                                    _context4.next = 16;
                                    break;
                                }

                                data = queryString.parseUrl(paging.next).query;
                                _context4.t0 = processorPromises.push;
                                _context4.t1 = processorPromises;
                                _context4.t2 = babelHelpers;
                                _context4.next = 13;
                                return this.processWorkouts(data, processor);

                            case 13:
                                _context4.t3 = _context4.sent;
                                _context4.t4 = _context4.t2.toConsumableArray.call(_context4.t2, _context4.t3);

                                _context4.t0.apply.call(_context4.t0, _context4.t1, _context4.t4);

                            case 16:
                                return _context4.abrupt('return', Promise.all(processorPromises));

                            case 17:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function processWorkouts() {
                return _ref4.apply(this, arguments);
            }

            return processWorkouts;
        }()
    }]);
    return Api;
}(dist.Api);

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

/**
 * Recalculate total ascent and descent.
 *
 * @param workout
 * @returns {Workout}
 */
function recalculateAscentDescent(workout) {
    var ascent = 0;
    var descent = 0;
    var previusPoint = null;

    workout.getPoints().forEach(function (point) {
        if (!previusPoint) {
            previusPoint = point;
            return;
        }

        var altitude = point.getAltitude();
        var previusAltitude = previusPoint.getAltitude();

        if (altitude === null) {
            return;
        }

        if (previusAltitude === null) {
            previusPoint = point;
            return;
        }

        var diff = altitude - previusAltitude;
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
 * Create new workout and delete old one. It is only way how to update points.
 *
 * @param workout
 * @param api
 * @param mobileApi
 * @returns {Promise<Workout>} Workout with updated id.
 */
var replaceWorkout = (function () {
    var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(workout, api, mobileApi) {
        var oldWorkoutId, newWorkoutId, newWorkout;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        oldWorkoutId = workout.getId();

                        if (oldWorkoutId) {
                            _context.next = 3;
                            break;
                        }

                        throw new EndomondoException('Workout does not have ID');

                    case 3:
                        _context.next = 5;
                        return mobileApi.createWorkout(workout);

                    case 5:
                        newWorkoutId = _context.sent;
                        newWorkout = workout.setId(newWorkoutId);


                        newWorkout.getHashtags().forEach(function (hashtag) {
                            api.addHashtag(hashtag, newWorkoutId);
                        });

                        _context.next = 10;
                        return api.editWorkout(newWorkout);

                    case 10:
                        _context.next = 12;
                        return api.deleteWorkout(oldWorkoutId);

                    case 12:
                        return _context.abrupt('return', newWorkout);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    function replaceWorkout(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    }

    return replaceWorkout;
})();

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
function rewriteWorkoutData(workout, type, getNewValue) {
    var newPoints = [].concat(toConsumableArray(workout.getPoints())).map(function (point) {
        var newValue = getNewValue(point);

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
    return Math.round(loc * Math.pow(10, 6)) / Math.pow(10, 6);
}

function rewriteAltitudeData(workout, altitudeData) {
    var newWorkout = rewriteWorkoutData(workout, 'altitude', function (point) {
        var elevation = altitudeData.find(function (item) {
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
