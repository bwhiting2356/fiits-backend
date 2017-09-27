"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildDirectionsRequest_1 = require("./buildDirectionsRequest");
var travelMode_1 = require("../../shared/travelMode");
var fetchDirections_1 = require("./fetchDirections");
exports.walking2DirectionsRequest = function (processManager) {
    var walkingRequest2 = buildDirectionsRequest_1.buildDirectionsRequest(processManager.tripData.station2Coords, processManager.tripData.destinationAddress, travelMode_1.TravelMode.walking);
    return fetchDirections_1.fetchDirections(walkingRequest2)
        .then(function (res) {
        processManager.addWalking2Directions(res);
        return processManager;
    });
};
//# sourceMappingURL=walking2DirectionsRequest.js.map