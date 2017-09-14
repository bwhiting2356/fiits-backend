import { StationData } from "../functions/stationData/StationData";
import { DistanceMatrixResultItem } from "./distanceMatrixResultItem";

export interface StationDistancePair {
    station: StationData,
    distance: DistanceMatrixResultItem
}
