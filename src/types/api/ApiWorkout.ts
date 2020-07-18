import { Privacy } from '../../constants/privacy';
import { Sport } from '../../constants/sport';
import { ApiPoint } from './ApiPoint';

export interface ApiWorkout {
    admin_rejected: boolean;
    altitude_max: number;
    altitude_min: number;
    ascent: number | null;
    author: {
        expand: string;
        first_name: string;
        gender: number;
        id: number;
        is_premium: boolean;
        last_name: string;
        name: string;
        picture: {
            url: string;
        };
        viewer_friendship: number;
    };
    calories: number;
    can_copy: boolean;
    can_fb_share_via_backend: boolean;
    descent: number | null;
    distance: number;
    duration: number;
    expand: string;
    feed_id: number;
    hashtags: string[];
    heart_rate_avg: number;
    heart_rate_max: number;
    heart_rate_zones: Record<string, unknown>;
    id: number;
    include_in_stats: boolean;
    is_live: boolean;
    is_peptalk_allowed: boolean;
    laps: Record<string, unknown>;
    local_start_time: string;
    message?: string;
    pb_count: number;
    personal_bests: unknown[];
    pictures: unknown[];
    points: {
        expand: string;
        id: number;
        points: ApiPoint[];
    };
    records: Record<string, unknown>[];
    show_map: Privacy;
    show_workout: Privacy;
    small_encoded_polyline: string;
    speed_avg: number;
    speed_max: number;
    sport: Sport;
    startTime: string;
    tagged_users: unknown[];
    title?: string;
    weather: Record<string, unknown>;
}
