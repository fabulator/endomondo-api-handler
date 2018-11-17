import {
    EVERYONE,
    FRIENDS,
    ME,
} from '../constants/privacy';

export type Privacy = typeof EVERYONE |
    typeof FRIENDS |
    typeof ME;
