import { StationDistanceData } from "../stationDistanceData";

export const compareBicyclingDistance = (
    a: StationDistanceData,
    b: StationDistanceData): number => {
    return a.bicyclingDistance.duration - b.bicyclingDistance.duration;
};
