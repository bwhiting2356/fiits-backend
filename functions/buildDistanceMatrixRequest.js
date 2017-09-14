"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mapStationDataToCoords_1 = require("./mapStationDataToCoords");
exports.buildDistanceMatrixRequest = function (coords, stationDataManager, mode) {
    var stationCoordsList = mapStationDataToCoords_1.mapStationDataToCoords(stationDataManager.stationDistanceData);
    return {
        origins: [coords],
        destinations: stationCoordsList,
        mode: mode
    };
};
//# sourceMappingURL=buildDistanceMatrixRequest.js.map