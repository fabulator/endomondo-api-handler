import { DateTime, Duration } from 'luxon';
import { Workout, SPORTS } from '../../src';

describe('Test Workout class', () => {
    let workout: Workout;

    beforeEach(() => {
        workout = new Workout({
            hashtags: [],
            sportId: SPORTS.CYCLING_SPORT,
            start: DateTime.local(),
            duration: Duration.fromMillis(1),
            points: [],
        });
    });

    it('exports gpx', () => {
        expect(typeof workout.toGpx()).toEqual('string');
    });

    describe('Test hashtag methods', () => {
        it('set and get hashtags', () => {
            expect(workout.getHashtags()).toEqual([]);

            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);

            workout.addHashtags(['b', 'c']);
            expect(workout.getHashtags()).toEqual(['a', 'b', 'c']);

            workout.setHashtags(['c']);
            expect(workout.getHashtags()).toEqual(['c']);
        });

        it('is not creating duplicate hashtags', () => {
            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);

            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);
        });

        it('find hashtag', () => {
            expect(workout.hasHashtag('a')).toEqual(false);
            workout.setHashtags(['c', 't', 'z']);
            expect(workout.hasHashtag('a')).toEqual(false);
            expect(workout.hasHashtag('tt')).toEqual(false);
            expect(workout.hasHashtag('z')).toEqual(true);
        });
    });
});
