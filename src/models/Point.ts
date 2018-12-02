import {
    DateTime,
    Duration,
    DurationObject,
    Zone,
} from 'luxon';
import { unit, Unit } from 'mathjs';
import { Point as BasePoint, TYPES } from 'fitness-models';
import { API } from '../types';

interface Constructor extends TYPES.PointConstructor {
    instruction?: number,
}

export default class Point extends BasePoint {
    protected instruction?: number;

    public constructor(options: Constructor) {
        super(options);
        this.instruction = options.instruction;
    }

    public static fromApi(point: API.Point, timezone: string | Zone): Point {
        const {
            distance,
            altitude,
            sensor_data,
            time,
        } = point;

        return new Point({
            time: time ? DateTime.fromISO(time, { zone: timezone }) : undefined,
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            duration: Duration.fromObject({
                seconds: point.duration,
            }),
            distance: distance != null ? unit(distance, 'km') : undefined,
            altitude: altitude != null ? unit(altitude, 'm') : undefined,
            ...(sensor_data ? {
                speed: sensor_data.speed != null ? unit(sensor_data.speed, 'km/h') : undefined,
                hr: sensor_data.heart_rate,
                cadence: sensor_data.cadence,
            } : {}),
        });
    }

    // eslint-disable-next-line complexity
    public static get(time: DateTime | string, latitude: number, longitude: number, {
        instruction,
        distance,
        duration,
        speed,
        altitude,
        cadence,
        hr,
    }: {
        instruction?: number,
        distance?: Unit | number,
        duration?: Duration | DurationObject | number,
        speed?: Unit | number,
        cadence?: number,
        hr?: number,
        altitude?: Unit | number,
    } = {}) {
        return new Point({
            time: time instanceof DateTime ? time : DateTime.fromISO(time, { setZone: true }),
            latitude,
            longitude,
            hr,
            instruction,
            cadence,
            distance: typeof distance === 'number' ? unit(distance, 'km') : distance,
            altitude: typeof altitude === 'number' ? unit(altitude, 'm') : altitude,
            speed: typeof speed === 'number' ? unit(speed, 'km/h') : speed,
            ...(duration instanceof Duration ? { duration } : {}),
            ...(typeof duration === 'number' ? { duration: Duration.fromObject({ seconds: duration }) } : {}),
            ...(!(duration instanceof Duration) && typeof duration === 'object' ? { duration: Duration.fromObject(duration) } : {}),
        });
    }

    protected clone(extension: Partial<Constructor> = {}): Point {
        return new Point({ ...this.toObject(), ...extension });
    }

    public getInstruction() {
        return this.instruction;
    }

    public setInstruction(instruction?: number) {
        return this.clone({ instruction });
    }

    public setTime(time?: DateTime) {
        return this.clone({ time });
    }

    public setLatitude(latitude?: number) {
        return this.clone({ latitude });
    }

    public setLongitude(longitude?: number) {
        return this.clone({ longitude });
    }

    public setAltitude(altitude?: Unit) {
        return this.clone({ altitude });
    }

    public setDistance(distance?: Unit) {
        return this.clone({ distance });
    }

    public setSpeed(speed?: Unit) {
        return this.clone({ speed });
    }

    public setHeartRate(hr?: number) {
        return this.clone({ hr });
    }

    public setCadence(cadence?: number) {
        return this.clone({ cadence });
    }

    public setDuration(duration?: Duration) {
        return this.clone({ duration });
    }

    public toObject(): Constructor {
        return {
            ...super.toObject(),
            instruction: this.getInstruction(),
        };
    }

    public toString(): string {
        const distance = this.getDistance();
        const altitude = this.getAltitude();
        const speed = this.getSpeed();
        const time = this.getTime();

        return [
            time != null ? time.toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\'') : undefined,
            this.getInstruction(),
            this.getLatitude(),
            this.getLongitude(),
            distance != null ? distance.toNumber('km') : undefined,
            speed != null ? speed.toNumber('km/h') : undefined,
            altitude != null ? altitude.toNumber('m') : undefined,
            this.getHeartRate(),
            this.getCadence(),
            '',
        ].map((item) => {
            return item == null ? '' : item;
        }).join(';');
    }
}
