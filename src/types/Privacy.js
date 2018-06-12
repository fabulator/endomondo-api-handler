// @flow strict
import {
    PRIVACY_EVERYONE,
    PRIVACY_FRIENDS,
    PRIVACY_ME,
} from './../constants/privacy';

export type Privacy =
    typeof PRIVACY_EVERYONE |
    typeof PRIVACY_FRIENDS |
    typeof PRIVACY_ME;
