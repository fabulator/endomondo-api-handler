export interface ApiPoint {
    altitude?: number;
    distance?: number;
    duration?: number;
    instruction?: number;
    latitude?: number;
    longitude?: number;
    sensor_data: {
        cadence?: number;
        heart_rate?: number;
        speed?: number;
    };
    time?: string;
}
