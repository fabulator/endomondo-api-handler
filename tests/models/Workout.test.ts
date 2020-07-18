import { DateTime, Duration } from 'luxon';
import { Privacy, Sport, Workout } from '../../src';

describe('Test ApiWorkout class', () => {
    let workout: Workout;

    beforeEach(() => {
        workout = new Workout({
            hashtags: [],
            typeId: Sport.CYCLING_SPORT,
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
        const privateWorkout = workout.setPrivacy(Privacy.FRIENDS);
        expect(privateWorkout.getPrivacy()).toEqual(Privacy.FRIENDS);
    });

    it('allows user model setter and extended workout property', () => {
        const workout2 = workout.setPrivacy(Privacy.FRIENDS).setMessage('haha');
        expect(workout2.getMessage()).toEqual('haha');
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
