import { Sport } from '../Sport';

export type Profile = {
    expand: string,
    id: number,
    first_name: string,
    last_name: string,
    picture: {
        url: string,
    },
    gender: number,
    is_premium: boolean,
    weight: number,
    height: number,
    hr_zones: {
        max: number,
        rest: number,
        zone1_start: number,
        zone2_start: number,
        zone3_start: number,
        zone4_start: number,
        zone5_start: number,
    },
    date_of_birth: string,
    workout_count: number,
    friend_count: number,
    summary: {
        count: number,
        total_distance: number,
        total_duration: number,
        total_calories: number,
    },
    summary_by_sport: Array<{
        sport: Sport,
        count: number,
        total_distance: number,
        total_duration: number,
        total_calories: number,
    }>,
    created_date: string,
    has_dismissed_download_box: boolean,
    time_zone: string,
    unit_system: string,
    country: string,
    email: string,
    personal_bests: Array<{
        workout_id: number,
        sport: Sport,
        date: string,
        type: number,
        value: number,
    }>,
    name: string,
    viewer_friendship: number,
    is_facebook_connected: boolean,
    is_twitter_connected: boolean,
};
