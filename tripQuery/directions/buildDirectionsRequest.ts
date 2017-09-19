import { Coords } from "../../shared/coords";
import { DirectionsRequest } from "./directionsRequest";

export const buildDirectionsRequest = (
    origin: string | Coords,
    destination: string | Coords,
    mode: string
    ): DirectionsRequest => {

    return {
        origin,
        destination,
        mode
    }
};
