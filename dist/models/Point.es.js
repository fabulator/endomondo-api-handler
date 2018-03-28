class Point {

    // eslint-disable-next-line complexity
    constructor({
        time,
        instruction,
        latitude,
        longitude,
        distance,
        duration,
        speed,
        hr,
        cadence,
        altitude
    }) {
        this.time = time;
        this.latitude = latitude;
        this.longitude = longitude;
        this.instruction = instruction || null;
        this.distance = distance || null;
        this.duration = duration || null;
        this.speed = speed || null;
        this.hr = hr || null;
        this.cadence = cadence || null;
        this.altitude = typeof altitude !== 'undefined' && altitude !== null ? altitude : null;
    }

    getTime() {
        return this.time;
    }

    setTime(time) {
        this.time = time;
        return this;
    }

    getLatitude() {
        return this.latitude;
    }

    setLatitude(latitude) {
        this.latitude = latitude;
        return this;
    }

    getLongitude() {
        return this.longitude;
    }

    setLongitude(longitude) {
        this.longitude = longitude;
        return this;
    }

    getAltitude() {
        return this.altitude;
    }

    setAltitude(altitude) {
        this.altitude = altitude;
        return this;
    }

    getInstruction() {
        return this.instruction;
    }

    setInstruction(instruction) {
        this.instruction = instruction;
        return this;
    }

    getDistance() {
        return this.distance;
    }

    setDistance(distance) {
        this.distance = distance;
        return this;
    }

    getSpeed() {
        return this.speed;
    }

    setSpeed(speed) {
        this.speed = speed;
        return this;
    }

    getHeartRate() {
        return this.hr;
    }

    setHeartRate(hr) {
        this.hr = hr;
        return this;
    }

    getCadence() {
        return this.cadence;
    }

    setCadence(cadence) {
        this.cadence = cadence;
        return this;
    }

    getDuration() {
        return this.duration;
    }

    setDuration(duration) {
        this.duration = duration;
        return this;
    }

    toString() {
        const distance = this.getDistance();

        return [this.getTime().toUTC().toFormat('yyyy-MM-dd HH:mm:ss \'UTC\''), this.getInstruction(), this.getLatitude(), this.getLongitude(), distance !== null ? distance.toNumber('km') : null, this.getSpeed(), this.getAltitude(), this.getHeartRate(), this.getCadence(), ''].map(item => {
            return item === null ? '' : item;
        }).join(';');
    }
}

export default Point;
