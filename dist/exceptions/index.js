'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.EndomondoException = EndomondoException;
exports.EndomondoApiException = EndomondoApiException;
