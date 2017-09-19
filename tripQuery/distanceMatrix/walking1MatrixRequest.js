"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var travelMode_1 = require("../../shared/travelMode");
var fetchDistanceMatrix_1 = require("./fetchDistanceMatrix");
var buildDistanceMatrixRequest_1 = require("./buildDistanceMatrixRequest");
exports.walking1MatrixRequest = function (tripQueryRequest, processManager) {
    var origin = tripQueryRequest.originAddress !== 'Current Location'
        ? tripQueryRequest.originAddress
        : tripQueryRequest.originCoords;
    var walkingRequest1 = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(origin, processManager.stationDistanceData, travelMode_1.TravelMode.walking);
    console.log(walkingRequest1);
    return fetchDistanceMatrix_1.fetchDistanceMatrix(walkingRequest1)
        .then(function (res) {
        processManager.addWalking1Distances(res);
        return processManager;
    });
};
//# sourceMappingURL=walking1MatrixRequest.js.map