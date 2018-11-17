import { DateTime } from 'luxon';
import rewriteWorkoutData from './rewriteWorkoutData';
import { Workout, Point } from '../models';

export type HrData = Array<{
    time: DateTime,
    hr: number,
}>;

export default function rewriteHeartRateData(workout: Workout, HRData: HrData): Workout {
    const data = HRData.map((item) => {
        return {
            hr: item.hr,
            time: item.time.valueOf(),
        };
    });

    return rewriteWorkoutData(workout, 'hr', (point: Point) => {
        const time = point.getTime().valueOf();

        const nearest = data.sort((a, b) => {
            return Math.abs(time - a.time) - Math.abs(time - b.time);
        })[0];

        if (point.getTime().diff(DateTime.fromMillis(nearest.time), ['milliseconds']).as('seconds') > 15) {
            return null;
        }

        return nearest.hr;
    });
}
