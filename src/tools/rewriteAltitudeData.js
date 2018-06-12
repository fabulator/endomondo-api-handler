// @flow strict
import recalculateAscentDescent from './recalculateAscentDescent';
import rewriteWorkoutData from './rewriteWorkoutData';
import type { Workout } from './../models';

function normalizeLocation(loc: number): number {
    return Math.round(loc * (10 ** 6)) / (10 ** 6);
}

export type AltitudeData = Array<{
    location: {
        lat: number,
        lng: number,
    },
    elevation: number,
}>;

export default function rewriteAltitudeData(workout: Workout, altitudeData: AltitudeData): Workout {
    const newWorkout = rewriteWorkoutData(workout, 'altitude', (point) => {
        const elevation = altitudeData.find((item) => {
            return normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude()) &&
                normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude());
        });
        return elevation ? elevation.elevation : null;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}
