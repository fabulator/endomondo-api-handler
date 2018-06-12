// @flow strict
import type { DateTime, Duration } from 'luxon';
import type { Unit } from 'mathjs';
import math from 'mathjs';
import { GarminBuilder, buildGPX } from 'gpx-builder/src';
import { SPORT_NAMES } from './../constants';
import EndomondoPoint from './Point';
import type { Sport, Privacy, ApiWorkout } from './../types';

const {
    Point,
    Metadata,
    Person,
    Link,
    Track,
    Segment,
} = GarminBuilder.MODELS;

type Constructing = {
    sportId: Sport,
    start: DateTime,
    duration: Duration,
    distance: ?Unit,
    points: Array<EndomondoPoint>,
    source?: ApiWorkout,
    ascent: ?number,
    descent: ?number,
    calories: ?number,
    notes: ?string,
    mapPrivacy: ?Privacy,
    workoutPrivacy: ?Privacy,
    hashtags?: Array<string>,
    heartRateAvg: ?number,
    heartRateMax?: number,
    title: ?string,
    id?: number,
}

export default class Workout {
    sportId: Sport;
    start: DateTime;
    duration: Duration;
    distance: ?Unit;
    points: Array<EndomondoPoint>;
    hashtags: Array<string>;
    source: ?ApiWorkout;
    ascent: ?number;
    descent: ?number;
    calories: ?number;
    notes: ?string;
    mapPrivacy: Privacy | null;
    workoutPrivacy: Privacy | null;
    id: ?number;
    heartRateAvg: ?number;
    heartRateMax: ?number;
    title: ?string;

    // eslint-disable-next-line complexity
    constructor({
        sportId,
        start,
        duration,
        distance,
        source,
        points,
        ascent,
        descent,
        calories,
        notes,
        mapPrivacy,
        workoutPrivacy,
        id,
        hashtags,
        heartRateAvg,
        heartRateMax,
        title,
    }: Constructing) {
        this.sportId = sportId;
        this.start = start;
        this.duration = duration;
        this.distance = distance;
        this.points = points || [];
        this.ascent = ascent || null;
        this.descent = descent || null;
        this.source = source || null;
        this.calories = calories || null;
        this.notes = notes || null;
        this.mapPrivacy = typeof mapPrivacy === 'number' ? mapPrivacy : null;
        this.workoutPrivacy = typeof workoutPrivacy === 'number' ? workoutPrivacy : null;
        this.id = id || null;
        this.hashtags = hashtags || [];
        this.heartRateAvg = heartRateAvg || null;
        this.heartRateMax = heartRateMax || null;
        this.title = title || null;
    }

    getId(): ?number {
        return this.id;
    }

    setId(id: ?number): this {
        this.id = id;
        return this;
    }

    getSportId(): Sport {
        return this.sportId;
    }

    setSportId(sportId: Sport): this {
        this.sportId = sportId;
        return this;
    }

    getSportName(): string {
        return SPORT_NAMES[this.getSportId()];
    }

    getStart(): DateTime {
        return this.start;
    }

    setStart(start: DateTime): this {
        this.start = start;
        return this;
    }

    getEnd(): DateTime {
        const points = this.getPoints();

        if (points) {
            return points[points.length - 1].getTime();
        }

        return this.getStart().plus(this.getDuration());
    }

    getDuration(): Duration {
        return this.duration;
    }

    setDuration(duration: Duration): this {
        this.duration = duration;
        return this;
    }

    getDistance(): ?Unit {
        return this.distance;
    }

    setDistance(distance: ?Unit): this {
        this.distance = distance;
        return this;
    }

    getPoints(): Array<EndomondoPoint> {
        return this.points;
    }

    hasGPSData(): boolean {
        return this.points.length > 0;
    }

    setPoints(points: Array<EndomondoPoint>): this {
        this.points = points;
        return this;
    }

    getAscent(): ?number {
        return this.ascent;
    }

    setAscent(ascent: ?number): this {
        this.ascent = ascent;
        return this;
    }

    getDescent(): ?number {
        return this.descent;
    }

    setDescent(descent: ?number): this {
        this.descent = descent;
        return this;
    }

    getCalories(): ?number {
        return this.calories;
    }

    setCalories(calories: ?number): this {
        this.calories = calories;
        return this;
    }

    getNotes(): ?string {
        return this.notes;
    }

    setNotes(notes: ?string) {
        this.notes = notes;
        return this;
    }

    getMapPrivacy(): Privacy | null {
        return this.mapPrivacy;
    }

    setMapPrivacy(privacy: Privacy | null): this {
        this.mapPrivacy = privacy;
        return this;
    }

    getWorkoutPrivacy(): Privacy | null {
        return this.workoutPrivacy;
    }

    setWorkoutPrivacy(privacy: Privacy | null): this {
        this.workoutPrivacy = privacy;
        return this;
    }

    getHashtags(): Array<string> {
        return this.hashtags;
    }

    setHashtags(hashtags: Array<string>): this {
        this.hashtags = hashtags;
        return this;
    }

    addHashtags(hashtags: Array<string>): this {
        hashtags.forEach((hashtag) => {
            this.addHashtag(hashtag);
        });

        return this;
    }

    addHashtag(hashtag: string): this {
        if (!this.hasHashtag(hashtag)) {
            this.hashtags.push(hashtag);
        }

        return this;
    }

    hasHashtag(hashtag: string): boolean {
        return this.hashtags.indexOf(hashtag) !== -1;
    }

    getAvgHeartRate(): ?number {
        return this.heartRateAvg;
    }

    setAvgHeartRate(hr: ?number): this {
        this.heartRateAvg = hr;
        return this;
    }

    getMaxHeartRate(): ?number {
        return this.heartRateMax;
    }

    setMaxHeartRate(hr: ?number): this {
        this.heartRateMax = hr;
        return this;
    }

    getTitle(): ?string {
        return this.title;
    }

    setTitle(title: ?string) {
        this.title = title;
        return this;
    }

    getSource(): ?ApiWorkout {
        return this.source;
    }

    getGpxPoints(): Array<Point> {
        return this.getPoints()
            .filter((point: EndomondoPoint) => {
                return point.getLatitude() != null && point.getLongitude() != null;
            }).map((point: EndomondoPoint) => {
                const speed = point.getSpeed();
                const hr = point.getHeartRate();
                const cadence = point.getCadence();
                const altitude = point.getAltitude();

                return new Point(point.getLatitude(), point.getLongitude(), {
                    time: point.getTime().toJSDate(),
                    ...(hr != null ? { hr } : {}),
                    ...(cadence != null ? { cad: cadence } : {}),
                    ...(altitude != null ? { ele: altitude } : {}),
                    ...(speed != null ? { speed: math.unit(speed, 'km/h').toNumber('m/s') } : {}),
                });
            });
    }

    // eslint-disable-next-line complexity
    toGpx(): string {
        const workoutId = this.getId();
        const authorId = this.source && this.source.author ? this.source.author.id : null;
        const authorName = this.source && this.source.author ? this.source.author.name : null;

        const builder = new GarminBuilder();

        builder.setMetadata(new Metadata({
            ...(authorName ? {
                author: new Person({
                    name: authorName,
                }),
            } : {}),
            link: new Link('http://www.endomondo.com', {
                text: 'Endomondo',
            }),
            time: this.getStart().toJSDate(),
        }));

        builder.setTracks([
            new Track([new Segment(this.getGpxPoints())], {
                src: 'http://www.endomondo.com/',
                ...(workoutId && authorId ? {
                    link: new Link(`https://www.endomondo.com/users/${authorId}/workouts/${workoutId}`, {
                        text: 'endomondo',
                    }),
                } : {}),
                type: this.getSportName(),
            }),
        ]);

        return buildGPX(builder.toObject());
    }

    toString(): string {
        const distance = this.getDistance();

        return [
            `Workout ${this.getId() || ''}`,
            `type: ${this.getSportName()}`,
            `start: ${this.getStart().toFormat('yyyy-MM-dd HH:mm')}`,
            distance ? `distance: ${Math.round(distance.toNumber('km') * 10) / 10}km` : null,
            `duration: ${Math.round(this.getDuration().as('minutes'))}min`,
        ].filter(item => item !== null).join('; ');
    }
}
