import { DateTime, Duration } from 'luxon';
import { Unit, unit } from 'mathjs';
import { Workout as BaseWorkout, TYPES } from 'fitness-models';
import { SPORT_NAMES as LIST_OF_SPORT_NAMES, SPORT, PRIVACY } from '../constants';
import Point from './Point';
import { Sport, Privacy, API } from '../types';
import { workoutGPXExporter } from '../helpers';

interface Constructor<Id, ApiSource> extends TYPES.WorkoutConstructor {
    typeId: Sport,
    points?: Array<Point>,
    mapPrivacy?: Privacy,
    workoutPrivacy?: Privacy,
    hashtags?: Array<string>,
    id: Id,
    source: ApiSource,
}

export default class Workout<Id extends (number | undefined) = any, ApiSource extends (API.Workout | undefined) = any> extends BaseWorkout {
    protected id: Id;

    protected typeId: Sport;

    protected points: Array<Point>;

    protected hashtags: Array<string>;

    protected source: ApiSource;

    protected mapPrivacy?: Privacy;

    protected workoutPrivacy?: Privacy;

    public constructor(options: Constructor<Id, ApiSource>) {
        super(options);

        this.typeId = options.typeId;
        this.points = options.points || [];
        this.mapPrivacy = options.mapPrivacy;
        this.workoutPrivacy = options.workoutPrivacy;
        this.hashtags = options.hashtags || [];
        this.id = options.id;
        this.source = options.source;

        this.isRace = this.hasHashtag('race');
        this.isCommute = this.hasHashtag('commute');
    }

    public static SPORT_NAMES: {[key: string]: string} = LIST_OF_SPORT_NAMES;

    public static SPORT: {[key: string]: Sport} = SPORT;

    public static PRIVACY: {[key: string]: Privacy} = PRIVACY;

    public static fromApi(workout: API.Workout): Workout<number, API.Workout> {
        const { points, distance } = workout;

        const start = DateTime.fromISO(workout.local_start_time, { setZone: true });

        return new Workout({
            start,
            typeId: workout.sport,
            duration: Duration.fromObject({
                seconds: workout.duration,
            }),
            source: workout,
            points: points && points.points ? points.points.map((point) => {
                return Point.fromApi(point, start.toFormat('z'));
            }) : [],
            ascent: workout.ascent ? unit(workout.ascent, 'm') : undefined,
            descent: workout.descent ? unit(workout.descent, 'm') : undefined,
            calories: workout.calories,
            notes: workout.message,
            mapPrivacy: workout.show_map,
            workoutPrivacy: workout.show_workout,
            id: workout.id,
            hashtags: workout.hashtags,
            avgHeartRate: workout.heart_rate_avg,
            maxHeartRate: workout.heart_rate_max,
            title: workout.title,
            ...(distance ? { distance: unit(distance, 'km') } : {}),
        });
    }

    // eslint-disable-next-line max-params
    public static get(
        typeId: Sport,
        start: DateTime,
        duration: Duration,
        distance?: Unit,
        points: Array<Point> = [],
        options: Partial<Constructor<undefined, undefined>> = {},
    ): Workout<undefined, undefined> {
        return new Workout({
            ...options,
            start,
            duration,
            distance,
            points,
            typeId,
            id: undefined,
            source: undefined,
        });
    }

    protected clone(extension: Partial<Constructor<number | undefined, ApiSource>>): any {
        return new Workout({
            ...this.toObject(),
            ...extension,
        });
    }

    public getId() {
        return this.id;
    }

    public setId(id: number): Workout<number, ApiSource>

    public setId(id: undefined): Workout<undefined, ApiSource>

    public setId(id: number | undefined) {
        return this.clone({ id });
    }

    public getTypeId() {
        return this.typeId;
    }

    public getSportName(): string {
        return Workout.SPORT_NAMES[this.getTypeId()];
    }

    public getPoints(): Array<Point> {
        return this.points;
    }

    public getMapPrivacy(): Privacy | undefined {
        return this.mapPrivacy;
    }

    public setMapPrivacy(mapPrivacy?: Privacy): Workout<Id, ApiSource> {
        return this.clone({ mapPrivacy });
    }

    public getWorkoutPrivacy(): Privacy | undefined {
        return this.workoutPrivacy;
    }

    public setWorkoutPrivacy(workoutPrivacy?: Privacy): Workout<Id, ApiSource> {
        return this.clone({ workoutPrivacy });
    }

    public getHashtags(): Array<string> {
        return this.hashtags;
    }

    public setHashtags(hashtags: Array<string>): Workout<Id, ApiSource> {
        return this.clone({ hashtags });
    }

    public addHashtags(hashtags: Array<string>): Workout<Id, ApiSource> {
        return this.clone({
            hashtags: [
                ...this.getHashtags(),
                ...hashtags,
            ],
        });
    }

    public addHashtag(hashtag: string): Workout<Id, ApiSource> {
        return this.addHashtags([hashtag]);
    }

    public hasHashtag(hashtag: string): boolean {
        return this.hashtags.indexOf(hashtag) !== -1;
    }

    public getSource(): ApiSource {
        return this.source;
    }

    public toGpx(): string {
        return workoutGPXExporter(this);
    }

    public setTypeId(typeId: Sport): Workout<Id, ApiSource> {
        return this.clone({ typeId });
    }

    public setStart(start: DateTime): Workout<Id, ApiSource> {
        return this.clone({ start });
    }

    public setDuration(duration: Duration): Workout<Id, ApiSource> {
        return this.clone({ duration });
    }

    public setDistance(distance?: Unit): Workout<Id, ApiSource> {
        return this.clone({ distance });
    }

    public setPoints(points: Array<Point>): Workout<Id, ApiSource> {
        return this.clone({ points });
    }

    public setCalories(calories?: number): Workout<Id, ApiSource> {
        return this.clone({ calories });
    }

    public setNotes(notes?: string): Workout<Id, ApiSource> {
        return this.clone({ notes });
    }

    public setAvgHeartRate(avgHeartRate?: number): Workout<Id, ApiSource> {
        return this.clone({ avgHeartRate });
    }

    public setMaxHeartRate(maxHeartRate?: number): Workout<Id, ApiSource> {
        return this.clone({ maxHeartRate });
    }

    public setTitle(title?: string): Workout<Id, ApiSource> {
        return this.clone({ title });
    }

    public setAscent(ascent?: Unit): Workout<Id, ApiSource> {
        return this.clone({ ascent });
    }

    public setDescent(descent?: Unit): Workout<Id, ApiSource> {
        return this.clone({ descent });
    }

    public toObject(): Constructor<Id, ApiSource> {
        return {
            ...super.toObject(),
            typeId: this.typeId,
            points: this.points,
            mapPrivacy: this.mapPrivacy,
            workoutPrivacy: this.workoutPrivacy,
            hashtags: this.hashtags,
            id: this.id,
            source: this.source,
        };
    }
}