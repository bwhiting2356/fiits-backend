import { Coords } from "../../shared/coords";
import { DistanceMatrixRequest } from "../../shared/distanceMatrixRequest";
import { StationDistanceData } from "../stationData/stationDistanceData";
import { stationDistanceDataToCoords } from "../stationData/stationDistanceDataToCoords";

export const buildDistanceMatrixRequest = (
    start: Coords | string,
    stationDistanceData: StationDistanceData[],
    mode: string
): DistanceMatrixRequest => {

    const stationCoordsList = stationDistanceDataToCoords(stationDistanceData);
    return {
        origins: [start],
        destinations: stationCoordsList,
        mode: mode
    }
};
