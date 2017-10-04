"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDirectionsRequest_1 = require("./buildDirectionsRequest");
var travelMode_1 = require("../../../../shared/travelMode");
var fetchDirections_1 = require("./fetchDirections");
exports.walking1DirectionsRequest = function (processManager) {
    var origin = processManager.tripData.originCoords
        ? processManager.tripData.originCoords
        : processManager.tripData.originAddress;
    var walkingRequest1 = buildDirectionsRequest_1.buildDirectionsRequest(origin, processManager.tripData.station1Coords, travelMode_1.TravelMode.walking);
    return fetchDirections_1.fetchDirections(walkingRequest1)
        .then(function (res) {
        processManager.addWalking1Directions(res);
        return processManager;
    });
};
//# sourceMappingURL=walking1DirectionsRequest.js.map