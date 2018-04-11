import { DateTime } from 'luxon';

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

        if (point.getTime().diff(DateTime.fromMillis(nearest.time), ['milliseconds']).as('seconds') > 15) {
            return null;
        }

        return nearest.hr;
    });
}

export default rewriteHeartRateData;
