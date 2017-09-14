import {StationDistanceData} from "./stationData/stationDistanceData";

export const mergeDistanceResultsWithStations = (matrixResponse, stations) => {
    let results = matrixResponse;
    let stationDistanceDataList: StationDistanceData[] = [];

    for (let i = 0; i < results.length; i++) {
        const newItem: StationDistanceData = {
            station: stations[i],
            distanceText: results[i].distance.text,
            duration: results[i].duration.value
        };
        stationDistanceDataList.push(newItem)
    }
    return stationDistanceDataList;
};

