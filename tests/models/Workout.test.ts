import { DateTime, Duration } from 'luxon';
import { Workout } from '../../src';

describe('Test Workout class', () => {
    let workout: Workout;

    beforeEach(() => {
        workout = new Workout({
            hashtags: [],
            typeId: Workout.SPORT.CYCLING_SPORT,
            start: DateTime.local(),
            duration: Duration.fromMillis(1),
            points: [],
            id: undefined,
            source: undefined,
        });
    });

    it('exports gpx', () => {
        expect(typeof workout.toGpx()).toEqual('string');
    });

    it('allows to set privacy', () => {
        const privateWorkout = workout.setWorkoutPrivacy(Workout.PRIVACY.FRIENDS);
        expect(privateWorkout.getWorkoutPrivacy()).toEqual(Workout.PRIVACY.FRIENDS);
    });

    describe('Test hashtag methods', () => {
        it('set and get hashtags', () => {
            expect(workout.getHashtags()).toEqual([]);

            const updatedWorkout = workout.addHashtag('a');

            expect(updatedWorkout.getHashtags()).toEqual(['a']);

            expect(updatedWorkout.addHashtags(['b', 'c']).getHashtags()).toEqual(['a', 'b', 'c']);

            expect(workout.setHashtags(['c']).getHashtags()).toEqual(['c']);
        });

        it('is not creating duplicate hashtags', () => {
            expect(workout.addHashtag('a').getHashtags()).toEqual(['a']);

            expect(workout.addHashtag('a').getHashtags()).toEqual(['a']);
        });

        it('find hashtag', () => {
            expect(workout.hasHashtag('a')).toEqual(false);

            const workoutWithHashtags = workout.setHashtags(['c', 't', 'z']);
            expect(workoutWithHashtags.hasHashtag('a')).toEqual(false);
            expect(workoutWithHashtags.hasHashtag('tt')).toEqual(false);
            expect(workoutWithHashtags.hasHashtag('z')).toEqual(true);
        });
    });
});
