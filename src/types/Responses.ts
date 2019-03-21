import { Workout } from '../models';
import * as API from './api';

export type ListOfWorkouts = {
    workouts: Workout<number, API.Workout>[],
} & API.Paging;
