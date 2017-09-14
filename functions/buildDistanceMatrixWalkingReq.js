"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDistanceMatrixWalkingReq = function (coords, stationCoordsList) {
    return {
        origins: [coords],
        destinations: stationCoordsList,
        mode: 'walking'
    };
};
//# sourceMappingURL=buildDistanceMatrixWalkingReq.js.map