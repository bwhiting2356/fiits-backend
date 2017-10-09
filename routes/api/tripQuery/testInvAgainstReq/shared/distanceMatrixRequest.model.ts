import { Coords } from "./coords";

export interface DistanceMatrixRequest {
    origins: Coords[],
    destinations: Coords[],
    mode: String
}
