import { DateTime } from 'luxon';
import { Point } from '../models';

export default (point: Point, data: { value: number, time: number }[]) => {
    const time = point.getTime();
    if (!time) {
        return undefined;
    }

    const valueOfTime = time.valueOf();

    const nearest = data.sort((a, b) => {
        return Math.abs(valueOfTime - a.time) - Math.abs(valueOfTime - b.time);
    })[0];

    if (time.diff(DateTime.fromMillis(nearest.time), ['milliseconds']).as('seconds') > 15) {
        return undefined;
    }

    return nearest.value;
};
