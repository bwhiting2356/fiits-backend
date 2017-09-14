import { StationData } from "./stationData/StationData";
import { DistanceMatrixResultItem } from "../shared/distanceMatrixResultItem";
import { StationDistancePair } from "../shared/stationDistancePair";

export const mergeDistanceMatrixWithStations = (
    stationDataList: StationData[],
    results: DistanceMatrixResultItem[]
    ): StationDistancePair[] => {

    let stationDistancePairList: StationDistancePair[] = [];

    for (let i = 0; i < results.length; i++) {
        stationDistancePairList.push({
            station: stationDataList[i],
            distance: results[i]
        })
    }

    return stationDistancePairList;
};
