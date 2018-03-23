// @flow
import { DateTime, Duration } from 'luxon';
import type { ApiWorkout } from './../types';
import PointFactory from './PointFactory';
import { Workout } from './../models';

export default class WorkoutFactory {
    static getWorkoutFromApi(workout: ApiWorkout): Workout {
        const { points } = workout;

        return new Workout({
            sportId: workout.sport,
            start: DateTime.fromISO(workout.local_start_time),
            duration: Duration.fromObject({
                seconds: workout.duration,
            }),
            distance: workout.distance,
            source: workout,
            points: points && points.points ? points.points.map((point) => {
                return PointFactory.getPointFromApi(point);
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
}
