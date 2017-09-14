"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var googleMapsClient = require("../googleMaps/googleMapsClient");
exports.fetchDirections = function (origin, destination, mode) {
    var request = {
        origin: {
            lat: origin.lat,
            lng: origin.lng
        },
        destination: {
            lat: destination.lat,
            lng: destination.lng
        },
        mode: mode
    };
    return googleMapsClient.directions(request).asPromise();
};
//# sourceMappingURL=fetchDirections.js.map