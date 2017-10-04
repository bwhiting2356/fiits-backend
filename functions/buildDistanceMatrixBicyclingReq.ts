

import { StationData } from "./stationData/StationData";
import {Coords} from "../shared/coords";
import {DistanceMatrixRequest} from "../routes/api/distanceMatrix/distanceMatrixRequest";

export const buildDistanceMatrixBicyclingReq = (
    coords: Coords[],
    stationDataList: StationData[]
): DistanceMatrixRequest => {

    return {
        origins: [coords],
        destinations: stationCoordsList,
        mode: 'bicycling'
    }
};
