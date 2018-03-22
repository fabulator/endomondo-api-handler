class EndomondoException extends Error {
    constructor(message) {
        super(`Endomondo Error: ${message}`);
    }
}

/**
 * Create new workout and delete old one. It is only way how to update points.
 *
 * @param workout
 * @param api
 * @param mobileApi
 * @returns {Promise<Workout>} Workout with updated id.
 */
async function replaceWorkout(workout, api, mobileApi) {
    const oldWorkoutId = workout.getId();

    if (!oldWorkoutId) {
        throw new EndomondoException('Workout does not have ID');
    }

    const newWorkoutId = await mobileApi.createWorkout(workout);

    const newWorkout = workout.setId(newWorkoutId);

    newWorkout.getHashtags().forEach(hashtag => {
        api.addHashtag(hashtag, newWorkoutId);
    });

    await api.editWorkout(newWorkout);
    await api.deleteWorkout(oldWorkoutId);

    return newWorkout;
}

export default replaceWorkout;
