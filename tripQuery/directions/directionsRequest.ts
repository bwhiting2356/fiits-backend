import { Coords } from "../../shared/coords";

export interface DirectionsRequest {
    origin: string | Coords;
    destination: string | Coords;
    mode: string
}
