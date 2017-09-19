import { Coords } from "../shared/coords";
import { DistanceMatrixRequest } from "../tripQuery/distanceMatrix/distanceMatrixRequest";
import {StationDataManager} from "./stationData/stationDataManager";
import {mapStationDataToCoords} from "./mapStationDataToCoords";

export const buildDistanceMatrixRequest = (
    coords: Coords,
    stationDataManager: StationDataManager,
    mode: string
): DistanceMatrixRequest => {

    const stationCoordsList = mapStationDataToCoords(stationDataManager.stationDistanceData);
    return {
        origins: [coords],
        destinations: stationCoordsList,
        mode: mode
    }
};
