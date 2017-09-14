import { StationData } from "./StationData";

export interface StationDistanceData {
    station: StationData;
    walking1Distance?: {
        distanceText: string,
        duration: number
    },
    walking2Distance?: {
        distanceText: string,
        duration: number
    },
    byciclingDistance?: {
        distanceText: string,
        duration: number
    }
}
