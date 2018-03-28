// @flow
import { DateTime, Duration } from 'luxon';
import math, { type Unit } from 'mathjs';
import type { Point as ApiPoint } from './../types/api';
import { Point } from './../models';

export default class PointFactory {
    static getPointFromApi(point: ApiPoint, timezone: string): Point {
        const { distance } = point;

        return new Point({
            time: DateTime.fromISO(point.time, { zone: timezone }),
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            distance: distance ? math.unit(distance, 'km') : null,
            altitude: point.altitude,
            duration: Duration.fromObject({
                seconds: point.duration,
            }),
            ...(point.sensor_data ? {
                speed: point.sensor_data.speed,
                hr: point.sensor_data.heart_rate,
                cadence: point.sensor_data.cadence,
            } : {}),
        });
    }

    static get(time: DateTime, latitude: number, longitude: number, {
        instruction,
        distance,
        duration,
        speed,
        altitude,
        cadence,
        hr,
    }: {
        instruction: ?number,
        distance: ?Unit,
        duration: ?Duration,
        speed: ?number,
        cadence: ?number,
        hr: ?number,
        altitude: ?number,
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
}
