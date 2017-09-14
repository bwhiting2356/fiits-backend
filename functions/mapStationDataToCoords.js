"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStationDataToCoords = function (stationDataList) {
    return stationDataList.map(function (s) {
        return { lat: s.station.lat, lng: s.station.lng };
    });
};
//# sourceMappingURL=mapStationDataToCoords.js.map