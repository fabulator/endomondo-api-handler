// @flow
import { DateTime, Duration } from 'luxon';
import type { Point as ApiPoint } from './../types/api';
import { Point } from './../models';

export default class PointFactory {
    static getPointFromApi(point: ApiPoint): Point {
        return new Point({
            time: DateTime.fromISO(point.time),
            instruction: point.instruction,
            latitude: point.latitude,
            longitude: point.longitude,
            distance: point.distance,
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
        distance: ?number,
        duration: ?Duration,
        speed: ?number,
        cadence: ?number,
        hr: ?number,
        altitude: ?number,
    }) {
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
