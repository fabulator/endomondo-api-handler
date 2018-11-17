import { DateTime } from 'luxon';
import rewriteWorkoutData from './rewriteWorkoutData';
import { Workout, Point } from '../models';

export type CadenceData = Array<{
    time: DateTime,
    cadence: number,
}>;

export default function rewriteCadenceData(workout: Workout, cadenceData: CadenceData): Workout {
    const data = cadenceData.map((item) => {
        return {
            cadence: item.cadence,
            time: item.time.valueOf(),
        };
    });

    return rewriteWorkoutData(workout, 'cadence', (point: Point) => {
        const time = point.getTime().valueOf();

        const nearest = data.sort((a, b) => {
            return Math.abs(time - a.time) - Math.abs(time - b.time);
        })[0];

        if (point.getTime().diff(DateTime.fromMillis(nearest.time), ['milliseconds']).as('seconds') > 15) {
            return null;
        }

        return nearest.cadence;
    });
}
