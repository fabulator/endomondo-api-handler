// @flow strict
import type { Workout, Point } from './../models';

type Type = 'altitude' | 'hr';

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
export default function rewriteWorkoutData(workout: Workout, type: Type, getNewValue: (point: Point) => number | null): Workout {
    const newPoints = [...workout.getPoints()].map((point) => {
        const newValue = getNewValue(point);

        if (type === 'altitude') {
            point.setAltitude(newValue);
        } else if (type === 'hr') {
            point.setHeartRate(newValue);
        }

        return point;
    });

    return workout.setPoints(newPoints);
}
