import { Workout as BaseWorkout, WorkoutConstructor } from 'fitness-models';
import { DateTime, Duration } from 'luxon';
import { Unit } from 'mathjs';
import { Sport, SPORT_NAMES } from '../constants';
import { workoutGPXExporter } from '../helpers';
import { unit } from '../helpers/math';
import { ApiWorkout } from '../types/api/ApiWorkout';
import Point from './Point';

interface Constructor<Id, ApiSource> extends WorkoutConstructor<Point> {
    hashtags?: string[];
    id: Id;
    message?: string;
    points?: Point[];
    source: ApiSource;
    typeId: Sport;
}

export default class Workout<Id extends number | undefined = any, ApiSource extends ApiWorkout | undefined = any> extends BaseWorkout {
    protected id: Id;

    protected typeId: Sport;

    protected points: Point[];

    protected hashtags: string[];

    protected source: ApiSource;

    protected message?: string;

    public constructor(options: Constructor<Id, ApiSource>) {
        super(options);

        this.typeId = options.typeId;
        this.points = options.points || [];
        this.hashtags = options.hashtags || [];
        this.id = options.id;
        this.source = options.source;
        this.message = options.message;

        this.isRace = this.hasHashtag('race');
        this.isCommute = this.hasHashtag('work');
    }

    public static fromApi(workout: ApiWorkout): Workout<number, ApiWorkout> {
        const { points, distance } = workout;

        const start = DateTime.fromISO(workout.local_start_time, { setZone: true });

        return new Workout({
            start,
            typeId: workout.sport,
            duration: Duration.fromObject({
                seconds: workout.duration,
            }),
            source: workout,
            points: points && points.points ? points.points.map((point) => Point.fromApi(point, start.toFormat('z'))) : [],
            ascent: workout.ascent ? unit(workout.ascent, 'm') : undefined,
            descent: workout.descent ? unit(workout.descent, 'm') : undefined,
            calories: workout.calories,
            notes: workout.message,
            mapPrivacy: workout.show_map,
            privacy: workout.show_workout,
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
        points: Point[] = [],
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

    protected clone(extension: Partial<Constructor<number | undefined, ApiSource>>): this {
        return new Workout({
            ...this.toObject(),
            ...extension,
        }) as this;
    }

    public getId() {
        return this.id;
    }

    public setId(id: number): Workout<number, ApiSource>;

    public setId(id: undefined): Workout<undefined, ApiSource>;

    public setId(id: number | undefined): Workout<number | undefined, ApiSource> {
        return this.clone({ id });
    }

    public getTypeId() {
        return this.typeId;
    }

    public getSportName(): string {
        return SPORT_NAMES[this.getTypeId()];
    }

    public getPoints(): Point[] {
        return this.points;
    }

    public getMessage() {
        return this.message;
    }

    public setMessage(message?: string) {
        return this.clone({ message });
    }

    public getSource(): ApiSource {
        return this.source;
    }

    public toGpx(): string {
        return workoutGPXExporter(this);
    }

    public hasGPSData(): boolean {
        return this.points.length > 0;
    }

    public setTypeId(typeId: Sport) {
        return this.clone({ typeId });
    }

    public toObject(): Constructor<Id, ApiSource> {
        return {
            ...super.toObject(),
            typeId: this.typeId,
            points: this.points,
            hashtags: this.hashtags,
            id: this.id,
            source: this.source,
            message: this.message,
        };
    }
}
