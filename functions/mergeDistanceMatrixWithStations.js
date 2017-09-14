"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDistanceMatrixWithStations = function (stationDataList, results) {
    var stationDistancePairList = [];
    for (var i = 0; i < results.length; i++) {
        stationDistancePairList.push({
            station: stationDataList[i],
            distance: results[i]
        });
    }
    return stationDistancePairList;
};
//# sourceMappingURL=mergeDistanceMatrixWithStations.js.map