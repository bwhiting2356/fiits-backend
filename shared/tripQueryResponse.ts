import { Coords } from './coords';
import { StationData } from "../functions/stationData/StationData";

export interface TripQueryResponse {
    origin: Coords;
    departureTime: Date;

    walking1Points: Coords[];
    walking1Duration: number;
    walking1DistanceText: string;

    station1: StationData;
    reservation1StartTime: Date;
    reservation1EndTime: Date;
    reservation1Price: number

    bicyclingPoints: Coords[];
    bicyclingDuration: number;
    bicyclingDistanceText: string;
    bicyclingPrice: number;

    station2: StationData;
    reservation2StartTime: Date;
    reservation2EndTime: Date;
    reservation2Price: Date;

    walking2Points: Coords[];
    walking2Duration: number;
    walking2DistanceText: string;

    destination: Coords;
    arrivalTime: Date;
}
