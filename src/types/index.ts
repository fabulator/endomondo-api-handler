import { Sport as SourceSport } from './Sport';
import { Privacy as SourcePrivacy } from './Privacy';
import {
    Point as SourceApiPoint,
    User as SourceApiUser,
    Workout as SourceApiWorkout,
    Workouts as SourceApiWorkouts,
    Paging as SourcePaging,
    WorkoutFilters as SourceWorkoutFilters,
} from './api';

export type Sport = SourceSport;
export type Privacy = SourcePrivacy;
export type Paging = SourcePaging;
export type WorkoutFilters = SourceWorkoutFilters;
export type ApiPoint = SourceApiPoint;
export type ApiUser = SourceApiUser;
export type ApiWorkout = SourceApiWorkout;
export type ApiWorkouts = SourceApiWorkouts;
