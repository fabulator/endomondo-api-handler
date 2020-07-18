import { DateTime } from 'luxon';

export type AltitudeData = {
    elevation: number;
    location: {
        lat: number;
        lng: number;
    };
}[];

export type CadenceData = {
    cadence: number;
    time: DateTime;
}[];

export type HrData = {
    hr: number;
    time: DateTime;
}[];
