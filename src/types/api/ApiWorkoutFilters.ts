import { Sport } from '../../constants/sport';

export interface ApiWorkoutFilters {
    after?: string;
    before?: string;
    expand?: string;
    fromDistance?: number;
    fromDuration?: number;
    limit?: number;
    offset?: number;
    sport?: Sport;
    title?: string;
    toDistance?: number;
    toDuration?: number;
}
