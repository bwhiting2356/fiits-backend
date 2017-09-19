"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDistanceMatrixRequest_1 = require("./buildDistanceMatrixRequest");
var travelMode_1 = require("../../shared/travelMode");
var fetchDistanceMatrix_1 = require("./fetchDistanceMatrix");
exports.bicyclingMatrixRequest = function (processManager) {
    var bicyclingRequest = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(processManager.bicyclingOriginStation, processManager.stationDistanceData, travelMode_1.TravelMode.bicycling);
    return fetchDistanceMatrix_1.fetchDistanceMatrix(bicyclingRequest)
        .then(function (res) {
        processManager.addBicyclingDistances(res);
        return processManager;
    });
};
//# sourceMappingURL=bicyclingMatrixRequest.js.map