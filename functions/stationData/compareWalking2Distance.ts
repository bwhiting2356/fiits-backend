import { StationDistanceData } from "./stationDistanceData";

export const compareWalking2Distance = (
    a: StationDistanceData,
    b: StationDistanceData): number => {
    return a.walking2Distance.duration - b.walking2Distance.duration;
};
