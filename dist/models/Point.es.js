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

export default Point;
