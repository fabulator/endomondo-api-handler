'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var luxon = require('luxon');

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

class EndomondoException extends Error {
    constructor(message) {
        super(`Endomondo Error: ${message}`);
    }
}

/**
 * Create new workout and delete old one. It is only way how to update points.
 *
 * @param workout
 * @param api
 * @param mobileApi
 * @returns {Promise<Workout>} Workout with updated id.
 */
async function replaceWorkout(workout, api, mobileApi) {
    const oldWorkoutId = workout.getId();

    if (!oldWorkoutId) {
        throw new EndomondoException('Workout does not have ID');
    }

    const newWorkoutId = await mobileApi.createWorkout(workout);

    const newWorkout = workout.setId(newWorkoutId);

    newWorkout.getHashtags().forEach(hashtag => {
        api.addHashtag(hashtag, newWorkoutId);
    });

    await api.editWorkout(newWorkout);
    await api.deleteWorkout(oldWorkoutId);

    return newWorkout;
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

function rewriteHeartRateData(workout, HRData) {
    const data = HRData.map(item => {
        return {
            hr: item.hr,
            time: item.time.valueOf()
        };
    });

    return rewriteWorkoutData(workout, 'hr', point => {
        const time = point.getTime().valueOf();

        const nearest = data.sort((a, b) => {
            return Math.abs(time - a.time) - Math.abs(time - b.time);
        })[0];

        if (point.getTime().diff(luxon.DateTime.fromMillis(nearest.time)).as('seconds') > 15) {
            return null;
        }

        return nearest.hr;
    });
}

exports.recalculateAscentDescent = recalculateAscentDescent;
exports.replaceWorkout = replaceWorkout;
exports.rewriteAltitudeData = rewriteAltitudeData;
exports.rewriteHeartRateData = rewriteHeartRateData;
