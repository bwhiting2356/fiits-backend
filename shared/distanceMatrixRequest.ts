import { Coords } from "./coords";

export interface DistanceMatrixRequest {
    origins: (string | Coords)[],
    destinations: Coords[],
    mode: String
}
