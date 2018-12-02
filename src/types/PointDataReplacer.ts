import { DateTime } from 'luxon';

export type AltitudeData = Array<{
    location: {
        lat: number,
        lng: number,
    },
    elevation: number,
}>;

export type CadenceData = Array<{
    time: DateTime,
    cadence: number,
}>;

export type HrData = Array<{
    time: DateTime,
    hr: number,
}>;
