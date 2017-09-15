import { Coords } from "../shared/coords";

export const getPointsFromDirections = (directionsResponse) => {
    // return directionsResponse.json.routes[0].overview_polyline.points;
    let points = new Set();
    directionsResponse.json.routes[0].legs[0].steps.forEach(step => {
        points.add(step.start_location);
        points.add(step.end_location);
    });
    return Array.from(points);
};
