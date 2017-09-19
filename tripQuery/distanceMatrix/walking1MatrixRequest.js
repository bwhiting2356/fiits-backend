"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var travelMode_1 = require("../../shared/travelMode");
var fetchDistanceMatrix_1 = require("./fetchDistanceMatrix");
var buildDistanceMatrixRequest_1 = require("./buildDistanceMatrixRequest");
var originAddressOrCoords_1 = require("./originAddressOrCoords");
exports.walking1MatrixRequest = function (tripQueryRequest, processManager) {
    var walkingRequest1 = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(originAddressOrCoords_1.originAddressOrCoords(tripQueryRequest), processManager.stationDistanceData, travelMode_1.TravelMode.walking);
    return fetchDistanceMatrix_1.fetchDistanceMatrix(walkingRequest1)
        .then(function (res) {
        processManager.addWalking1Distances(res);
        return processManager;
    });
};
//# sourceMappingURL=walking1MatrixRequest.js.map