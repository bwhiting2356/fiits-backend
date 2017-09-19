import { StationData } from "./stationData";
import { DistanceData } from "./distanceData";

export interface StationDistanceData {
    station: StationData;
    walking1Distance?: DistanceData;
    walking2Distance?: DistanceData;
    bicyclingDistance?: DistanceData;
}
