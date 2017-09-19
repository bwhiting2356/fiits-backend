"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDirectionsRequest_1 = require("./buildDirectionsRequest");
var travelMode_1 = require("../../shared/travelMode");
var fetchDirections_1 = require("./fetchDirections");
exports.bicyclingDirectionsRequest = function (processManager) {
    var bicyclingRequest = buildDirectionsRequest_1.buildDirectionsRequest(processManager.tripQueryResponse.station1Coords, processManager.tripQueryResponse.station2Coords, travelMode_1.TravelMode.bicycling);
    return fetchDirections_1.fetchDirections(bicyclingRequest)
        .then(function (res) {
        processManager.addBicyclingDirections(res);
        return processManager;
    });
};
//# sourceMappingURL=bicyclingDirectionsRequest.js.map