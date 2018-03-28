// @flow
import { PointFactory, Point } from './../../src';

describe('Test PointFactory class', () => {
    it('create point from api response', () => {
        const apiPoint = {
            time: '2018-03-27T16:19:01.000Z',
            instruction: 5,
            latitude: 1.5,
            longitude: 1.6,
            distance: 6,
            duration: 2,
            altitude: 9,
            sensor_data: {
                cadence: 66,
            },
        };
        const point = PointFactory.getPointFromApi(apiPoint, 'UTC');
        expect(point instanceof Point).toBeTruthy();
    });
});
