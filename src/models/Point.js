// @flow strict
import type { DateTime, Duration } from 'luxon';
import type { Unit } from 'mathjs';

type Constructor = {
    time: DateTime,
    latitude: number,
    longitude: number,
    instruction: ?number,
    distance: ?Unit,
    altitude: ?number,
    duration: ?Duration,
    speed: ?number,
    hr: ?number,
    cadence: ?number,
    altitude: ?number;
}

export default class Point {
    time: DateTime;
    latitude: number;
    longitude: number;
    instruction: number | null;
    distance: Unit | null;
    duration: Duration | null;
    speed: number | null;
    hr: number | null;
    cadence: number | null;
    altitude: number | null;

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
        altitude,
    }: Constructor) {
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

    getTime(): DateTime {
        return this.time;
    }

    setTime(time: DateTime): this {
        this.time = time;
        return this;
    }

    getLatitude(): number {
        return this.latitude;
    }

    setLatitude(latitude: number): this {
        this.latitude = latitude;
        return this;
    }

    getLongitude(): number {
        return this.longitude;
    }

    setLongitude(longitude: number): this {
        this.longitude = longitude;
        return this;
    }

    getAltitude(): number | null {
        return this.altitude;
    }

    setAltitude(altitude: number | null): this {
        this.altitude = altitude;
        return this;
    }

    getInstruction(): number | null {
        return this.instruction;
    }

    setInstruction(instruction: number | null): this {
        this.instruction = instruction;
        return this;
    }

    getDistance(): Unit | null {
        return this.distance;
    }

    setDistance(distance: Unit | null) {
        this.distance = distance;
        return this;
    }

    getSpeed(): number | null {
        return this.speed;
    }

    setSpeed(speed: number | null): this {
        this.speed = speed;
        return this;
    }

    getHeartRate(): number | null {
        return this.hr;
    }

    setHeartRate(hr: number | null): this {
        this.hr = hr;
        return this;
    }

    getCadence(): number | null {
        return this.cadence;
    }

    setCadence(cadence: number | null): this {
        this.cadence = cadence;
        return this;
    }

    getDuration(): Duration | null {
        return this.duration;
    }

    setDuration(duration: Duration): this {
        this.duration = duration;
        return this;
    }

    toString(): string {
        const distance = this.getDistance();

        return [
            this.getTime().toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\''),
            this.getInstruction(),
            this.getLatitude(),
            this.getLongitude(),
            distance !== null ? distance.toNumber('km') : null,
            this.getSpeed(),
            this.getAltitude(),
            this.getHeartRate(),
            this.getCadence(),
            '',
        ].map((item) => {
            return item === null ? '' : item;
        }).join(';');
    }
}
