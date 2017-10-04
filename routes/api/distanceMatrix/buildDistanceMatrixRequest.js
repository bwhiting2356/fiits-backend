"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stationDistanceDataToCoords_1 = require("../stationData/stationDistanceDataToCoords");
exports.buildDistanceMatrixRequest = function (start, stationDistanceData, mode) {
    var stationCoordsList = stationDistanceDataToCoords_1.stationDistanceDataToCoords(stationDistanceData);
    return {
        origins: [start],
        destinations: stationCoordsList,
        mode: mode
    };
};
//# sourceMappingURL=buildDistanceMatrixRequest.js.map