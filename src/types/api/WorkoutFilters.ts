import { DateTime, Duration } from 'luxon';
import { Sport } from '../Sport';

export type WorkoutFilters = {
    after?: string | DateTime,
    before?: string | DateTime,
    fromDuration?: number | Duration,
    toDuration?: number | Duration,
    limit?: number,
    fromDistance?: number,
    toDistance?: number,
    title?: string,
    sport?: Sport,
    expand?: string,
    offset?: number,
};
