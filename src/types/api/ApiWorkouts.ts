import { ApiPaging } from './ApiPaging';
import { ApiWorkout } from './ApiWorkout';

export type ApiWorkouts = {
    data: ApiWorkout[];
} & ApiPaging;
