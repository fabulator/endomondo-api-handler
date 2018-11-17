import { DateTime, Duration } from 'luxon';
import { unit, Unit } from 'mathjs';
import { Point as ApiPoint } from '../types/api';

type Constructor = {
    time: DateTime,
    latitude: number,
    longitude: number,
    instruction?: number,
    distance?: Unit,
    altitude?: number,
    duration?: Duration,
    speed?: number,
    hr?: number,
    cadence?: number,
};

export default class Point {
    private time: DateTime;

    private latitude: number;

    private longitude: number;

    private instruction: number | null;

    private distance: Unit | null;

    private duration: Duration | null;

    private speed: number | null;

    private hr: number | null;

    private cadence: number | null;

    private altitude: number | null;

    // eslint-disable-next-line complexity
    public constructor({
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

    public static fromApi(point: ApiPoint, timezone: string): Point {
        const { distance } = point;

        return new Point({
            time: DateTime.fromISO(point.time, { zone: timezone }),
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            altitude: point.altitude,
            duration: Duration.fromObject({
                seconds: point.duration,
            }),
            ...(distance ? { distance: unit(distance, 'km') } : {}),
            ...(point.sensor_data ? {
                speed: point.sensor_data.speed,
                hr: point.sensor_data.heart_rate,
                cadence: point.sensor_data.cadence,
            } : {}),
        });
    }

    public static get(time: DateTime, latitude: number, longitude: number, {
        instruction,
        distance,
        duration,
        speed,
        altitude,
        cadence,
        hr,
    }: {
        instruction?: number,
        distance?: Unit,
        duration?: Duration,
        speed?: number,
        cadence?: number,
        hr?: number,
        altitude?: number,
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
            cadence,
        });
    }

    public getTime(): DateTime {
        return this.time;
    }

    public setTime(time: DateTime): this {
        this.time = time;
        return this;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number): this {
        this.latitude = latitude;
        return this;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(longitude: number): this {
        this.longitude = longitude;
        return this;
    }

    public getAltitude(): number | null {
        return this.altitude;
    }

    public setAltitude(altitude: number | null): this {
        this.altitude = altitude;
        return this;
    }

    public getInstruction(): number | null {
        return this.instruction;
    }

    public setInstruction(instruction: number | null): this {
        this.instruction = instruction;
        return this;
    }

    public getDistance(): Unit | null {
        return this.distance;
    }

    public setDistance(distance: Unit | null) {
        this.distance = distance;
        return this;
    }

    public getSpeed(): number | null {
        return this.speed;
    }

    public setSpeed(speed: number | null): this {
        this.speed = speed;
        return this;
    }

    public getHeartRate(): number | null {
        return this.hr;
    }

    public setHeartRate(hr: number | null): this {
        this.hr = hr;
        return this;
    }

    public getCadence(): number | null {
        return this.cadence;
    }

    public setCadence(cadence: number | null): this {
        this.cadence = cadence;
        return this;
    }

    public getDuration(): Duration | null {
        return this.duration;
    }

    public setDuration(duration: Duration): this {
        this.duration = duration;
        return this;
    }

    public toString(): string {
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
