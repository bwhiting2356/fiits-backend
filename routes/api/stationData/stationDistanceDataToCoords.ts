import { Coords } from "../../../shared/coords";
import { StationDistanceData } from "./stationDistanceData";
import { stationToCoords } from "./stationToCoords";

export const stationDistanceDataToCoords = (stationDataList: StationDistanceData[]): Coords[] => {
    return stationDataList.map(s => stationToCoords(s.station));
};
