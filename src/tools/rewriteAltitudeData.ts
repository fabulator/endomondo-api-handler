import recalculateAscentDescent from './recalculateAscentDescent';
import rewriteWorkoutData from './rewriteWorkoutData';
import { Workout } from '../models';
import { POINT_DATA_REPLACER } from '../types';

function normalizeLocation(loc?: number): number | undefined {
    if (loc == null) {
        return loc;
    }
    return Math.round(loc * (10 ** 6)) / (10 ** 6);
}

export default function rewriteAltitudeData(workout: Workout, altitudeData: POINT_DATA_REPLACER.AltitudeData): Workout {
    const newWorkout = rewriteWorkoutData(workout, 'altitude', (point) => {
        const elevation = altitudeData.find((item) => {
            return normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude())
                && normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude());
        });
        return elevation ? elevation.elevation : undefined;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}
