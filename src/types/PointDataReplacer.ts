import { DateTime } from 'luxon';

export type AltitudeData = {
    location: {
        lat: number,
        lng: number,
    },
    elevation: number,
}[];

export type CadenceData = {
    time: DateTime,
    cadence: number,
}[];

export type HrData = {
    time: DateTime,
    hr: number,
}[];
