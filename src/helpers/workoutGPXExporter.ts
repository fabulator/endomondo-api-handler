import { GarminBuilder, buildGPX } from 'gpx-builder';
import Workout from '../models/Workout';
import EndomondoPoint from '../models/Point';

const {
    Point,
    Metadata,
    Person,
    Link,
    Track,
    Segment,
} = GarminBuilder.MODELS;

// @ts-ignore
function convertPoints(points: EndomondoPoint[]): Point[] {
    return points.map((point: EndomondoPoint) => {
        return point.toObject();
    }).map((point) => {
        const {
            altitude,
            cadence,
            hr,
            latitude,
            longitude,
            speed,
            time,
        } = point;

        if (!latitude || !longitude) {
            return null;
        }

        return new Point(latitude, longitude, {
            time: time ? time.toJSDate() : undefined,
            hr,
            cad: cadence,
            ele: altitude ? altitude.toNumber('m') : undefined,
            speed: speed ? speed.toNumber('m/s') : undefined,
        });
    }).filter((item) => item !== null);
}

export default (workout: Workout): string => {
    const workoutId = workout.getId();
    const source = workout.getSource();
    const authorId = source && source.author ? source.author.id : null;
    const authorName = source && source.author ? source.author.name : null;

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
        time: workout.getStart().toJSDate(),
    }));

    builder.setTracks([
        new Track([new Segment(convertPoints(workout.getPoints()))], {
            src: 'http://www.endomondo.com/',
            ...(workoutId && authorId ? {
                link: new Link(`https://www.endomondo.com/users/${authorId}/workouts/${workoutId}`, {
                    text: 'endomondo',
                }),
            } : {}),
            type: workout.getSportName(),
        }),
    ]);

    return buildGPX(builder.toObject());
};
