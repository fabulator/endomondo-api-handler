'use strict';

/**
 * Recalculate total ascent and descent.
 *
 * @param workout
 * @returns {Workout}
 */
function recalculateAscentDescent(workout) {
    let ascent = 0;
    let descent = 0;
    let previusPoint = null;

    workout.getPoints().forEach(point => {
        if (!previusPoint) {
            previusPoint = point;
            return;
        }

        const altitude = point.getAltitude();
        const previusAltitude = previusPoint.getAltitude();

        if (altitude === null) {
            return;
        }

        if (previusAltitude === null) {
            previusPoint = point;
            return;
        }

        const diff = altitude - previusAltitude;
        if (diff > 0) {
            ascent += diff;
        } else {
            descent -= diff;
        }

        previusPoint = point;
    });

    return workout.setAscent(ascent).setDescent(descent);
}

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
function rewriteWorkoutData(workout, type, getNewValue) {
    const newPoints = [...workout.getPoints()].map(point => {
        const newValue = getNewValue(point);

        if (type === 'altitude') {
            point.setAltitude(newValue);
        } else if (type === 'hr') {
            point.setHeartRate(newValue);
        }

        return point;
    });

    return workout.setPoints(newPoints);
}

function normalizeLocation(loc) {
    return Math.round(loc * 10 ** 6) / 10 ** 6;
}

function rewriteAltitudeData(workout, altitudeData) {
    const newWorkout = rewriteWorkoutData(workout, 'altitude', point => {
        const elevation = altitudeData.find(item => {
            return normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude()) && normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude());
        });
        return elevation ? elevation.elevation : null;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}

module.exports = rewriteAltitudeData;
