import { Workout } from '../models';
import { Api, MobileApi } from '../api';

/**
 * Create new workout and delete old one. It is only way how to update points.
 *
 * @param workout
 * @param api
 * @param mobileApi
 * @returns Workout with updated id.
 */
export default async function replaceWorkout(workout: Workout<number>, api: Api, mobileApi: MobileApi): Promise<Workout> {
    const newWorkoutId = await mobileApi.createWorkout(workout);

    const newWorkout = workout.setId(newWorkoutId);

    newWorkout.getHashtags().forEach((hashtag) => {
        api.addHashtag(hashtag, newWorkoutId);
    });

    await api.editWorkout(newWorkout);
    await api.deleteWorkout(workout.getId());

    return newWorkout;
}
