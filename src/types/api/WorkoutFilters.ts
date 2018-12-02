import { Sport } from '../Sport';

export interface WorkoutFilters {
    after?: string,
    before?: string,
    fromDuration?: number,
    toDuration?: number,
    limit?: number,
    fromDistance?: number,
    toDistance?: number,
    title?: string,
    sport?: Sport,
    expand?: string,
    offset?: number,
}
