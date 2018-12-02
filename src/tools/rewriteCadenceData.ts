import rewriteWorkoutData from './rewriteWorkoutData';
import { Workout, Point } from '../models';
import { POINT_DATA_REPLACER } from '../types';
import rewriteTimeData from './rewriteTimeData';

export default function rewriteCadenceData(workout: Workout, cadenceData: POINT_DATA_REPLACER.CadenceData): Workout {
    return rewriteWorkoutData(workout, 'cadence', (point: Point) => {
        return rewriteTimeData(point, cadenceData.map((item) => {
            return {
                value: item.cadence,
                time: item.time.valueOf(),
            };
        }));
    });
}
