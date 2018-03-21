'use strict';

/**
 * Recalculate total ascent and descent.
 *
 * @param workout
 * @returns {Workout}
 */
function recalculateAscentDescent(workout) {
    var ascent = 0;
    var descent = 0;
    var previusPoint = null;

    workout.getPoints().forEach(function (point) {
        if (!previusPoint) {
            previusPoint = point;
            return;
        }

        var altitude = point.getAltitude();
        var previusAltitude = previusPoint.getAltitude();

        if (altitude === null) {
            return;
        }

        if (previusAltitude === null) {
            previusPoint = point;
            return;
        }

        var diff = altitude - previusAltitude;
        if (diff > 0) {
            ascent += diff;
        } else {
            descent -= diff;
        }

        previusPoint = point;
    });

    return workout.setAscent(ascent).setDescent(descent);
}

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Rewrite altitude or hr of points based on updater.
 *
 * @param workout
 * @param type
 * @param getNewValue
 * @returns {Workout}
 */
function rewriteWorkoutData(workout, type, getNewValue) {
    var newPoints = [].concat(toConsumableArray(workout.getPoints())).map(function (point) {
        var newValue = getNewValue(point);

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
    return Math.round(loc * Math.pow(10, 6)) / Math.pow(10, 6);
}

function rewriteAltitudeData(workout, altitudeData) {
    var newWorkout = rewriteWorkoutData(workout, 'altitude', function (point) {
        var elevation = altitudeData.find(function (item) {
            return normalizeLocation(item.location.lat) === normalizeLocation(point.getLatitude()) && normalizeLocation(item.location.lng) === normalizeLocation(point.getLongitude());
        });
        return elevation ? elevation.elevation : null;
    });

    // in finish, recalculate ascent and descent
    return recalculateAscentDescent(newWorkout);
}

module.exports = rewriteAltitudeData;
