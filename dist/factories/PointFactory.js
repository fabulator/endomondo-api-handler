'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var luxon = require('luxon');
var math = _interopDefault(require('mathjs'));

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

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    toString() {
        const distance = this.getDistance();

        return [this.getTime().toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\''), this.getInstruction(), this.getLatitude(), this.getLongitude(), distance !== null ? distance.toNumber('km') : null, this.getSpeed(), this.getAltitude(), this.getHeartRate(), this.getCadence(), ''].map(item => {
            return item === null ? '' : item;
        }).join(';');
    }
}

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
    static getPointFromApi(point, timezone) {
        const { distance } = point;

        return new Point(_extends({
            time: luxon.DateTime.fromISO(point.time, { zone: timezone }),
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            distance: distance ? math.unit(distance, 'km') : null,
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
    } = {}) {
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

module.exports = PointFactory;
