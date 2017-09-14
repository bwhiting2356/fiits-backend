import { Coords } from "../shared/coords";
import {StationDistanceData} from "./stationData/stationDistanceData";

export const mapStationDataToCoords = (stationDataList: StationDistanceData[]): Coords[] => {
    return stationDataList.map(s => {
        return { lat: s.station.lat, lng: s.station.lng }
    });
};
