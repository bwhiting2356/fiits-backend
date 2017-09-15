"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPointsFromDirections = function (directionsResponse) {
    // return directionsResponse.json.routes[0].overview_polyline.points;
    var points = new Set();
    directionsResponse.json.routes[0].legs[0].steps.forEach(function (step) {
        points.add(step.start_location);
        points.add(step.end_location);
    });
    return Array.from(points);
};
//# sourceMappingURL=getPointsFromDirections.js.map