import { Workout } from './Workout';
import { Paging } from './Paging';

export type Workouts = {
    data: Workout[],
} & Paging;
