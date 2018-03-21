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

module.exports = recalculateAscentDescent;
