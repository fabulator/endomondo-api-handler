import { unit } from 'mathjs';
import { Workout, Point } from '../models';

/**
 * Recalculate total ascent and descent.
 *
 * @param workout
 * @returns {Workout}
 */
export default function recalculateAscentDescent(workout: Workout): Workout {
    let ascent = 0;
    let descent = 0;
    let previusPoint: Point | null = null;

    workout.getPoints().forEach((point) => {
        if (!previusPoint) {
            previusPoint = point;
            return;
        }

        const altitude = point.getAltitude();
        const previusAltitude = previusPoint.getAltitude();

        if (altitude == null) {
            return;
        }

        if (previusAltitude == null) {
            previusPoint = point;
            return;
        }

        const diff = altitude.toNumber('m') - previusAltitude.toNumber('m');
        if (diff > 0) {
            ascent += diff;
        } else {
            descent -= diff;
        }

        previusPoint = point;
    });

    return workout
        .setAscent(unit(ascent, 'm'))
        .setDescent(unit(descent, 'm'));
}
