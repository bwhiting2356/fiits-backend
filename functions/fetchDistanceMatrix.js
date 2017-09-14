"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleMapsClient = require("../googleMaps/googleMapsClient");
exports.fetchDistanceMatrix = function (distanceMatrixRequest) {
    return googleMapsClient.distanceMatrix(distanceMatrixRequest).asPromise();
};
//# sourceMappingURL=fetchDistanceMatrix.js.map