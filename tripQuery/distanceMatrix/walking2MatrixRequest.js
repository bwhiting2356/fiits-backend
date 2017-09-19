"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDistanceMatrixRequest_1 = require("./buildDistanceMatrixRequest");
var travelMode_1 = require("../../shared/travelMode");
var fetchDistanceMatrix_1 = require("./fetchDistanceMatrix");
exports.walking2MatrixRequest = function (tripQueryRequest, processManager) {
    var walkingRequest2 = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(tripQueryRequest.destinationAddress, processManager.stationDistanceData, travelMode_1.TravelMode.walking);
    return fetchDistanceMatrix_1.fetchDistanceMatrix(walkingRequest2)
        .then(function (res) {
        processManager.addWalking1Distances(res);
        return processManager;
    });
};
//# sourceMappingURL=walking2MatrixRequest.js.map