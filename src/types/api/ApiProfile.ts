import { Sport } from '../../constants/sport';

export interface ApiProfile {
    country: string;
    created_date: string;
    date_of_birth: string;
    email: string;
    expand: string;
    first_name: string;
    friend_count: number;
    gender: number;
    has_dismissed_download_box: boolean;
    height: number;
    hr_zones: {
        max: number;
        rest: number;
        zone1_start: number;
        zone2_start: number;
        zone3_start: number;
        zone4_start: number;
        zone5_start: number;
    };
    id: number;
    is_facebook_connected: boolean;
    is_premium: boolean;
    is_twitter_connected: boolean;
    last_name: string;
    name: string;
    personal_bests: {
        date: string;
        sport: Sport;
        type: number;
        value: number;
        workout_id: number;
    }[];
    picture: {
        url: string;
    };
    summary: {
        count: number;
        total_calories: number;
        total_distance: number;
        total_duration: number;
    };
    summary_by_sport: {
        count: number;
        sport: Sport;
        total_calories: number;
        total_distance: number;
        total_duration: number;
    }[];
    time_zone: string;
    unit_system: string;
    viewer_friendship: number;
    weight: number;
    workout_count: number;
}
