/* eslint-disable import/export */
import { Api, MobileApi } from './api';
import * as EXCEPTIONS from './exceptions';
import { Point, Workout } from './models';
import * as TOOLS from './tools';
import {
    Sport as SportSource,
    Privacy as PrivacySource,
    WorkoutFilters as WorkoutFiltersSource,
    API as API_TYPES,
    RESPONSES as RESPONSES_TYPES,
    POINT_DATA_REPLACER as POINT_DATA_REPLACER_TYPES,
} from './types';

export declare namespace TYPES {
    export type Sport = SportSource;
    export type Privacy = PrivacySource;
    export type WorkoutFilters = WorkoutFiltersSource;

    namespace API {
        export type Point = API_TYPES.Point;
        export type Paging = API_TYPES.Paging;
        export type User = API_TYPES.User;
        export type Workout = API_TYPES.Workout;
        export type WorkoutFilters = API_TYPES.WorkoutFilters;
        export type Workouts = API_TYPES.Workouts;
        export type Profile = API_TYPES.Profile;
    }

    namespace POINT_DATA_REPLACER {
        export type AltitudeData = POINT_DATA_REPLACER_TYPES.AltitudeData;
        export type CadenceData = POINT_DATA_REPLACER_TYPES.CadenceData;
        export type HrData = POINT_DATA_REPLACER_TYPES.HrData;
    }

    namespace RESPONSES {
        export type ListOfWorkouts = RESPONSES_TYPES.ListOfWorkouts;
    }
}

export {
    Api,
    MobileApi,
    EXCEPTIONS,
    Point,
    Workout,
    TOOLS,
};
