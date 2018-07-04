// @flow strict
import math, { type Unit } from 'mathjs';
import { DateTime, Duration } from 'luxon';
import type { ApiWorkout, Privacy, Sport } from './../types';
import PointFactory from './PointFactory';
import { Workout, type Point } from './../models';

export default class WorkoutFactory {
    static getWorkoutFromApi(workout: ApiWorkout): Workout {
        const { points, distance } = workout;

        const start = DateTime.fromISO(workout.local_start_time, { setZone: true });

        return new Workout({
            start,
            sportId: workout.sport,
            duration: Duration.fromObject({
                seconds: workout.duration,
            }),
            distance: distance ? math.unit(workout.distance, 'km') : null,
            source: workout,
            points: points && points.points ? points.points.map((point) => {
                return PointFactory.getPointFromApi(point, start.toFormat('z'));
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
            title: workout.title,
        });
    }

    // eslint-disable-next-line max-params
    static get(sportId: Sport, start: DateTime, duration: Duration, distance: ?Unit, points: Array<Point> = [], options: {
        ascent?: ?number,
        descent?: ?number,
        calories?: ?number,
        notes?: ?string,
        mapPrivacy?: ?Privacy,
        workoutPrivacy?: ?Privacy,
        hashtags?: Array<string>,
        heartRateAvg?: ?number,
        title?: ?string,
    }) {
        return new Workout({
            ...options,
            sportId,
            start,
            duration,
            distance,
            points,
        });
    }
}
