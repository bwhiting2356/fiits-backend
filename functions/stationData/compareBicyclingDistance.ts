import { StationDistanceData } from "./stationDistanceData";

export const compareBicyclingDistance = (
    a: StationDistanceData,
    b: StationDistanceData): number => {
    return a.byciclingDistance.duration - b.byciclingDistance.duration;
};
