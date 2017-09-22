import { TripQueryRequest } from "../shared/tripQueryRequest";
import { getStationData } from "./stationData/getStationData";
import { findReservation } from "./findReservation/findReservation";
import { ProcessManager } from "./processManager/processManager";
import { walking1MatrixRequest } from "./distanceMatrix/walking1MatrixRequest";
import { walking2MatrixRequest } from "./distanceMatrix/walking2MatrixRequest";
import { bicyclingMatrixRequest } from "./distanceMatrix/bicyclingMatrixRequest";
import { TripQueryResponse } from "../shared/tripQueryResponse";
import { parseTripQueryRequest } from "./parseTripQueryRequest";
import { walking1DirectionsRequest } from "./directions/walking1DirectionsRequest";
import { walking2DirectionsRequest } from "./directions/walking2DirectionsRequest";
import { bicyclingDirectionsRequest } from "./directions/bicyclingDirectionsRequest";

export const tripQuery = async (req): Promise<TripQueryResponse> => {
    const tripQueryRequest = parseTripQueryRequest(req);
    console.log("\n\ntrip query request:\n\n", tripQueryRequest);
    const processManager = new ProcessManager(tripQueryRequest);
    return getStationData(processManager)
        .then(processManager => walking1MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => walking2MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => findReservation(processManager.firstStation, processManager))
        .then(processManager => walking1DirectionsRequest(processManager))
        .then(processManager => bicyclingMatrixRequest(processManager))
        .then(processManager => findReservation(processManager.secondStation, processManager))
        .then(processManager => walking2DirectionsRequest(processManager))
        .then(processManager => bicyclingDirectionsRequest(processManager))
        .then(processManager => processManager.tripQueryResponse);
};
