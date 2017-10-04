import { StationDistanceData } from "../stationDistanceData";

export const compareWalking1Distance = (
    a: StationDistanceData,
    b: StationDistanceData): number => {
    return a.walking1Distance.duration - b.walking1Distance.duration;
};
