import { Point } from '../../src';
import { apiPoint } from '../__mock__/point';

describe('Test PointFactory class', () => {
    it('create point from api response', () => {
        const point = Point.fromApi(apiPoint, 'UTC');
        expect(point instanceof Point).toBeTruthy();
    });
});
