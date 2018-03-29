import 'cross-fetch/polyfill';
import { DateTime, Duration } from 'luxon';
import math from 'mathjs';
import { Api, WorkoutFactory } from './../../src';

const api = new Api();
api.setUserId(1);

const putSpy = jest.spyOn(api, 'put').mockImplementation(() => {
    return Promise.resolve({ data: { } });
});

let workout;

describe('Api testing', () => {
    beforeEach(() => {
        workout = WorkoutFactory.get(
            0,
            DateTime.fromObject({
                year: 2018,
                month: 3,
                day: 5,
                hour: 4,
                zone: 'utc',
            }),
            Duration.fromObject({ minutes: 5 }),
        );
    });

    afterEach(() => {
        putSpy.mockReset();
    });

    describe('Edit workout', () => {
        it('with basic parameters', async () => {
            await api.editWorkout(workout);

            expect(putSpy).toHaveBeenCalledWith('rest/v1/users/1/workouts/', {
                duration: 300,
                sport: 0,
                start_time: '2018-03-05T04:00:00.000Z',
            });
        });

        it('with distance', async () => {
            workout.setDistance(math.unit(6, 'km'));
            await api.editWorkout(workout);

            expect(putSpy).toHaveBeenCalledWith('rest/v1/users/1/workouts/', {
                duration: 300,
                sport: 0,
                start_time: '2018-03-05T04:00:00.000Z',
                distance: 6,
            });
        });

        it('with option properties', async () => {
            workout
                .setAvgHeartRate(80)
                .setMaxHeartRate(180)
                .setTitle('titulek')
                .setAscent(666)
                .setDescent(999)
                .setNotes('xzxs')
                .setMapPrivacy(0)
                .setWorkoutPrivacy(1);

            await api.editWorkout(workout);

            expect(putSpy).toHaveBeenCalledWith('rest/v1/users/1/workouts/', {
                ascent: 666,
                descent: 999,
                duration: 300,
                heart_rate_avg: 80,
                heart_rate_max: 180,
                notes: 'xzxs',
                show_map: 0,
                show_workout: 1,
                sport: 0,
                start_time: '2018-03-05T04:00:00.000Z',
                title: 'titulek',
            });
        });
    });
});
