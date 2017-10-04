import { Coords } from './coords';
import { DistanceData } from "../routes/api/stationData/distanceData";

export interface TripData {
    originAddress?: string;
    originCoords?: Coords
    departureTime?: Date;

    walking1Points?: Coords[];
    walking1Distance?: DistanceData;

    station1Coords?: Coords;
    station1Address?: string;
    reservation1Time?: Date;
    reservation1Price?: number

    bicyclingPoints?: Coords[];
    bicyclingDistance?: DistanceData;
    bicyclingPrice?: number;

    station2Coords?: Coords;
    station2Address?: string;
    reservation2Time?: Date;
    reservation2Price?: Date;

    walking2Points?: Coords[];
    walking2Distance?: DistanceData;

    destinationAddress?: string;
    destinationCoords?: Coords;
    arrivalTime?: Date;
}
