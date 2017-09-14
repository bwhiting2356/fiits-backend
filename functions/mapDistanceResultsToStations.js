"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDistanceResultsWithStations = function (matrixResponse, stations) {
    var results = matrixResponse;
    var stationDistanceDataList = [];
    for (var i = 0; i < results.length; i++) {
        var newItem = {
            station: stations[i],
            distanceText: results[i].distance.text,
            duration: results[i].duration.value
        };
        stationDistanceDataList.push(newItem);
    }
    return stationDistanceDataList;
};
//# sourceMappingURL=mapDistanceResultsToStations.js.map