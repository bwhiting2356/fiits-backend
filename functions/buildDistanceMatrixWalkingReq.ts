import { DistanceMatrixRequest } from "../shared/distanceMatrixRequest";
import { Coords } from "../shared/coords";

export const buildDistanceMatrixWalkingReq = (
    coords: Coords,
    stationCoordsList: Coords[],
    ): DistanceMatrixRequest => {

    return {
        origins: [coords],
        destinations: stationCoordsList,
        mode: 'walking'
    }
};
