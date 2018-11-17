/* eslint-disable max-lines */
import { DateTime, Duration } from 'luxon';
import { Unit, unit } from 'mathjs';
import { GarminBuilder, buildGPX } from 'gpx-builder';
import { SPORT_NAMES } from '../constants';
import EndomondoPoint from './Point';
import { Sport, Privacy, ApiWorkout } from '../types';

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
    points: Array<EndomondoPoint>,
    distance?: Unit,
    source?: ApiWorkout,
    ascent?: number,
    descent?: number,
    calories?: number,
    notes?: string,
    mapPrivacy?: Privacy,
    workoutPrivacy?: Privacy,
    hashtags?: Array<string>,
    heartRateAvg?: number,
    heartRateMax?: number,
    title?: string,
    id?: number,
};

export default class Workout {
    private sportId: Sport;

    private start: DateTime;

    private duration: Duration;

    private distance: Unit | null;

    private points: Array<EndomondoPoint>;

    private hashtags: Array<string>;

    private source: ApiWorkout | null;

    private ascent: number | null;

    private descent: number | null;

    private calories: number | null;

    private notes: string | null;

    private mapPrivacy: Privacy | null;

    private workoutPrivacy: Privacy | null;

    private id: number | null;

    private heartRateAvg: number | null;

    private heartRateMax: number | null;

    private title: string | null;

    // eslint-disable-next-line complexity
    public constructor({
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
        this.distance = distance || null;
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

    public static fromApi(workout: ApiWorkout): Workout {
        const { points, distance } = workout;

        const start = DateTime.fromISO(workout.local_start_time, { setZone: true });

        return new Workout({
            start,
            sportId: workout.sport,
            duration: Duration.fromObject({
                seconds: workout.duration,
            }),
            source: workout,
            points: points && points.points ? points.points.map((point) => {
                return EndomondoPoint.fromApi(point, start.toFormat('z'));
            }) : [],
            ascent: workout.ascent,
            descent: workout.descent,
            calories: workout.calories,
            notes: workout.message,
            mapPrivacy: workout.show_map,
            workoutPrivacy: workout.show_workout,
            id: workout.id,
            hashtags: workout.hashtags,
            heartRateAvg: workout.heart_rate_avg,
            heartRateMax: workout.heart_rate_max,
            title: workout.title,
            ...(distance ? { distance: unit(distance, 'km') } : {}),
        });
    }

    // eslint-disable-next-line max-params
    public static get(sportId: Sport, start: DateTime, duration: Duration, distance?: Unit, points: Array<EndomondoPoint> = [], options: {
        ascent?: number,
        descent?: number,
        calories?: number,
        notes?: string,
        mapPrivacy?: Privacy,
        workoutPrivacy?: Privacy,
        hashtags?: Array<string>,
        heartRateAvg?: number,
        title?: string,
    } = {}) {
        return new Workout({
            ...options,
            sportId,
            start,
            duration,
            distance,
            points,
        });
    }

    public getId(): number | null {
        return this.id;
    }

    public setId(id: number | null): this {
        this.id = id;
        return this;
    }

    public getSportId(): Sport {
        return this.sportId;
    }

    public setSportId(sportId: Sport): this {
        this.sportId = sportId;
        return this;
    }

    public getSportName(): string {
        return SPORT_NAMES[this.getSportId()];
    }

    public getStart(): DateTime {
        return this.start;
    }

    public setStart(start: DateTime): this {
        this.start = start;
        return this;
    }

    public getEnd(): DateTime {
        const points = this.getPoints();

        if (points) {
            return points[points.length - 1].getTime();
        }

        return this.getStart().plus(this.getDuration());
    }

    public getDuration(): Duration {
        return this.duration;
    }

    public setDuration(duration: Duration): this {
        this.duration = duration;
        return this;
    }

    public getDistance(): Unit | null {
        return this.distance;
    }

    public setDistance(distance: Unit | null): this {
        this.distance = distance;
        return this;
    }

    public getPoints(): Array<EndomondoPoint> {
        return this.points;
    }

    public hasGPSData(): boolean {
        return this.points.length > 0;
    }

    public setPoints(points: Array<EndomondoPoint>): this {
        this.points = points;
        return this;
    }

    public getAscent(): number | null {
        return this.ascent;
    }

    public setAscent(ascent: number | null): this {
        this.ascent = ascent;
        return this;
    }

    public getDescent(): number | null {
        return this.descent;
    }

    public setDescent(descent: number | null): this {
        this.descent = descent;
        return this;
    }

    public getCalories(): number | null {
        return this.calories;
    }

    public setCalories(calories: number | null): this {
        this.calories = calories;
        return this;
    }

    public getNotes(): string | null {
        return this.notes;
    }

    public setNotes(notes: string | null) {
        this.notes = notes;
        return this;
    }

    public getMapPrivacy(): Privacy | null {
        return this.mapPrivacy;
    }

    public setMapPrivacy(privacy: Privacy | null): this {
        this.mapPrivacy = privacy;
        return this;
    }

    public getWorkoutPrivacy(): Privacy | null {
        return this.workoutPrivacy;
    }

    public setWorkoutPrivacy(privacy: Privacy | null): this {
        this.workoutPrivacy = privacy;
        return this;
    }

    public getHashtags(): Array<string> {
        return this.hashtags;
    }

    public setHashtags(hashtags: Array<string>): this {
        this.hashtags = hashtags;
        return this;
    }

    public addHashtags(hashtags: Array<string>): this {
        hashtags.forEach((hashtag) => {
            this.addHashtag(hashtag);
        });

        return this;
    }

    public addHashtag(hashtag: string): this {
        if (!this.hasHashtag(hashtag)) {
            this.hashtags.push(hashtag);
        }

        return this;
    }

    public hasHashtag(hashtag: string): boolean {
        return this.hashtags.indexOf(hashtag) !== -1;
    }

    public getAvgHeartRate(): number | null {
        return this.heartRateAvg;
    }

    public setAvgHeartRate(hr: number | null): this {
        this.heartRateAvg = hr;
        return this;
    }

    public getMaxHeartRate(): number | null {
        return this.heartRateMax;
    }

    public setMaxHeartRate(hr: number | null): this {
        this.heartRateMax = hr;
        return this;
    }

    public getTitle(): string | null {
        return this.title;
    }

    public setTitle(title: string | null) {
        this.title = title;
        return this;
    }

    public getSource(): ApiWorkout | null {
        return this.source;
    }

    private getGpxPoints(): Array<any> {
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
                    ...(speed != null ? { speed: unit(speed, 'km/h').toNumber('m/s') } : {}),
                });
            });
    }

    // eslint-disable-next-line complexity
    public toGpx(): string {
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

    public toString(): string {
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
