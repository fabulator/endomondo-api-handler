import { Workout } from './../../src';

describe('Test Workout class', () => {
    describe('Test hashtag methods', () => {
        it('set and get hashtags', () => {
            const workout = new Workout({
                hashtags: [],
            });
            expect(workout.getHashtags()).toEqual([]);

            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);

            workout.addHashtags(['b', 'c']);
            expect(workout.getHashtags()).toEqual(['a', 'b', 'c']);

            workout.setHashtags(['c']);
            expect(workout.getHashtags()).toEqual(['c']);
        });

        it('is not creating duplicate hashtags', () => {
            const workout = new Workout({
                hashtags: [],
            });

            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);

            workout.addHashtag('a');
            expect(workout.getHashtags()).toEqual(['a']);
        });

        it('find hashtag', () => {
            const workout = new Workout({
                hashtags: [],
            });
            expect(workout.hasHashtag('a')).toEqual(false);
            workout.setHashtags(['c', 't', 'z']);
            expect(workout.hasHashtag('a')).toEqual(false);
            expect(workout.hasHashtag('tt')).toEqual(false);
            expect(workout.hasHashtag('z')).toEqual(true);
        });
    });
});
