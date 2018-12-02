import { unit } from 'mathjs';
import { Workout, Point } from '../models';

type Type = 'altitude' | 'hr' | 'cadence';

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
export default function rewriteWorkoutData(workout: Workout, type: Type, getNewValue: (point: Point) => number | undefined): Workout {
    const newPoints = workout.getPoints().map((point) => {
        const newValue = getNewValue(point);

        if (type === 'altitude') {
            return point.setAltitude(newValue ? unit(newValue, 'm') : undefined);
        }

        if (type === 'hr') {
            return point.setHeartRate(newValue);
        }

        return point.setCadence(newValue);
    });

    return workout.setPoints(newPoints);
}
