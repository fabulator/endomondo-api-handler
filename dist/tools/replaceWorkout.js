'use strict';

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

module.exports = replaceWorkout;
