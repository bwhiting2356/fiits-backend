import { Coords } from "./coords";

export interface TripQueryRequest {
    originAddress: string,
    originCoords?: Coords,
    destinationAddress: string;
    destinationCoords?: Coords;
    time: Date;
    timeTarget: String
}
