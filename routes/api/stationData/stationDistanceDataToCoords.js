"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stationToCoords_1 = require("./stationToCoords");
exports.stationDistanceDataToCoords = function (stationDataList) {
    return stationDataList.map(function (s) { return stationToCoords_1.stationToCoords(s.station); });
};
//# sourceMappingURL=stationDistanceDataToCoords.js.map