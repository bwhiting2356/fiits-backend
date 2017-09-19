import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { Coords } from "../../shared/coords";

export const originAddressOrCoords = (
    tripQueryRequest: TripQueryRequest
): string | Coords => {
    return tripQueryRequest.originAddress !== 'Current Location'
        ? tripQueryRequest.originAddress
        : tripQueryRequest.originCoords;
};
