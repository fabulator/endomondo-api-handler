import { Point, Workout } from '../models';
import { CadenceData } from '../types/PointDataReplacer';
import rewriteTimeData from './rewriteTimeData';
import rewriteWorkoutData from './rewriteWorkoutData';

export default function rewriteCadenceData(workout: Workout, cadenceData: CadenceData): Workout {
    return rewriteWorkoutData(workout, 'cadence', (point: Point) => {
        return rewriteTimeData(
            point,
            cadenceData.map((item) => {
                return {
                    value: item.cadence,
                    time: item.time.valueOf(),
                };
            }),
        );
    });
}
