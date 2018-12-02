import { DateTime, Duration } from 'luxon';
import { WorkoutFilters as ApiWorkoutFilters } from './api';

type CleanApiWorkoutFilters = Pick<ApiWorkoutFilters, Exclude<keyof ApiWorkoutFilters, 'after' | 'before' | 'fromDuration' | 'toDuration'>>;

export interface WorkoutFilters extends CleanApiWorkoutFilters {
    after?: string | DateTime,
    before?: string | DateTime,
    fromDuration?: number | Duration,
    toDuration?: number | Duration,
}
