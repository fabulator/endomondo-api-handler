import { DateTime, Duration } from 'luxon';
import { ApiWorkoutFilters } from './api/ApiWorkoutFilters';

type CleanApiWorkoutFilters = Pick<ApiWorkoutFilters, Exclude<keyof ApiWorkoutFilters, 'after' | 'before' | 'fromDuration' | 'toDuration'>>;

export interface WorkoutFilters extends CleanApiWorkoutFilters {
    after?: string | DateTime;
    before?: string | DateTime;
    fromDuration?: number | Duration;
    toDuration?: number | Duration;
}
