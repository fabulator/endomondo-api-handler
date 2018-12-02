/* eslint-disable import/export */
import { Sport as SourceSport } from './Sport';
import { Privacy as SourcePrivacy } from './Privacy';
import { WorkoutFilters as SourceWorkoutFilters } from './WorkoutFilters';
import * as POINT_DATA_REPLACER_SOURCE from './PointDataReplacer';
import * as API_SOURCE from './api';
import * as RESPONSES_SOURCE from './Responses';

export declare namespace API {
    export type Point = API_SOURCE.Point;
    export type Paging = API_SOURCE.Paging;
    export type User = API_SOURCE.User;
    export type Workout = API_SOURCE.Workout;
    export type WorkoutFilters = API_SOURCE.WorkoutFilters;
    export type Workouts = API_SOURCE.Workouts;
    export type Profile = API_SOURCE.Profile;
}

export declare namespace POINT_DATA_REPLACER {
    export type AltitudeData = POINT_DATA_REPLACER_SOURCE.AltitudeData;
    export type CadenceData = POINT_DATA_REPLACER_SOURCE.CadenceData;
    export type HrData = POINT_DATA_REPLACER_SOURCE.HrData;
}

export declare namespace RESPONSES {
    export type ListOfWorkouts = RESPONSES_SOURCE.ListOfWorkouts;
}

export type Sport = SourceSport;
export type Privacy = SourcePrivacy;
export type WorkoutFilters = SourceWorkoutFilters;
