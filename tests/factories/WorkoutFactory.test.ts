import {
    Workout,
    SPORTS,
    PRIVACY,
} from '../../src';
import { apiPoint } from './PointFactory.test';

const apiWorkout = {
    expand: '',
    id: 1,
    sport: SPORTS.CYCLING_SPORT,
    startTime: '2018-07-03T14:26:00.000Z',
    local_start_time: '2018-07-03T16:26:00.000+02:00',
    distance: 1,
    duration: 1,
    speed_avg: 0,
    speed_max: 0,
    altitude_min: 5,
    altitude_max: 4,
    ascent: 50,
    descent: 4,
    pb_count: 0,
    calories: 5,
    is_live: false,
    include_in_stats: false,
    can_fb_share_via_backend: false,
    author: {
        expand: '',
        id: 5,
        first_name: '',
        last_name: '',
        picture: {
            url: '',
        },
        gender: 1,
        is_premium: true,
        name: '',
        viewer_friendship: 1,
    },
    is_peptalk_allowed: false,
    can_copy: false,
    weather: {},
    heart_rate_avg: 1,
    heart_rate_max: 1,
    heart_rate_zones: {},
    feed_id: 1,
    laps: {},
    small_encoded_polyline: '',
    records: [],
    hashtags: [],
    tagged_users: [],
    pictures: [],
    points: {
        expand: '',
        id: 4,
        points: [apiPoint],
    },
    show_map: PRIVACY.ME,
    show_workout: PRIVACY.ME,
    admin_rejected: true,
    personal_bests: [],
};

describe('Test WorkoutFactory test class', () => {
    it('create workout from api response', () => {
        const workout = Workout.fromApi(apiWorkout);
        expect(workout instanceof Workout).toBeTruthy();
    });

    it('create right dateTime in workout', () => {
        const workout = Workout.fromApi(apiWorkout);
        expect(workout.getStart().offset).toEqual(120);
    });

    it('create right dateTime in points', () => {
        const workout = Workout.fromApi(apiWorkout);
        expect(workout.getPoints()[0].getTime().offset).toEqual(120);
    });
});
