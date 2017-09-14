import { Coords } from "./coords";

export interface TripQueryRequest {
    origin: Coords;
    destination: Coords;
    time: Date;
    timeTarget: String
}
