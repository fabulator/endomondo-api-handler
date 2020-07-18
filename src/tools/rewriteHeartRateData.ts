import { Point, Workout } from '../models';
import { HrData } from '../types/PointDataReplacer';
import rewriteTimeData from './rewriteTimeData';
import rewriteWorkoutData from './rewriteWorkoutData';

export default function rewriteHeartRateData(workout: Workout, hrData: HrData): Workout {
    return rewriteWorkoutData(workout, 'hr', (point: Point) => {
        return rewriteTimeData(
            point,
            hrData.map((item) => {
                return {
                    value: item.hr,
                    time: item.time.valueOf(),
                };
            }),
        );
    });
}
