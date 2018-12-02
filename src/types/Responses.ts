import { Workout } from '../models';
import * as API from './api';

export type ListOfWorkouts = {
    workouts: Array<Workout<number, API.Workout>>,
} & API.Paging;
