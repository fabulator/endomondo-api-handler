import { Workout } from '../models';
import { ApiPaging } from './api/ApiPaging';
import { ApiWorkout } from './api/ApiWorkout';

export type ListOfWorkouts = {
    workouts: Workout<number, ApiWorkout>[];
} & ApiPaging;
