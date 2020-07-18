import { Workout } from '../models';
import { AltitudeData } from '../types/PointDataReplacer';
import recalculateAscentDescent from './recalculateAscentDescent';
import rewriteWorkoutData from './rewriteWorkoutData';

function normalizeLocation(loc?: number): number | undefined {
    if (loc === undefined) {
        return loc;
    }
    return Math.round(loc * 10 ** 6) / 10 ** 6;
}

export default function rewriteAltitudeData(workout: Workout, altitudeData: AltitudeData): Workout {
    const newWorkout = rewriteWorkoutData(workout, 'altitude', (point) => {
        const elevation = altitudeData.find((item) => {
            return (
                normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude()) &&
                normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude())
            );
        });
        return elevation ? elevation.elevation : undefined;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}
