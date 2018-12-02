import rewriteWorkoutData from './rewriteWorkoutData';
import rewriteTimeData from './rewriteTimeData';
import { Workout, Point } from '../models';
import { POINT_DATA_REPLACER } from '../types';

export default function rewriteHeartRateData(workout: Workout, HrData: POINT_DATA_REPLACER.HrData): Workout {
    return rewriteWorkoutData(workout, 'hr', (point: Point) => {
        return rewriteTimeData(point, HrData.map((item) => {
            return {
                value: item.hr,
                time: item.time.valueOf(),
            };
        }));
    });
}
