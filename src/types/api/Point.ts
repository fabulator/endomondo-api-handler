export interface Point {
    time?: string,
    instruction?: number,
    latitude?: number,
    longitude?: number,
    distance?: number,
    duration?: number,
    altitude?: number,
    sensor_data: {
        speed?: number,
        heart_rate?: number,
        cadence?: number,
    },
}
