import { Coords } from "../../../shared/coords";

export interface DistanceMatrixRequest {
    origins: (string | Coords)[],
    destinations: Coords[],
    mode: String
}
