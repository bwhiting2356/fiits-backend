import { Trip } from "../db/db";

import { getStationData } from "./stationData/getStationData";
import { findReservation } from "./findReservation/findReservation";
import { ProcessManager } from "./processManager/processManager";
import { walking1MatrixRequest } from "./distanceMatrix/walking1MatrixRequest";
import { walking2MatrixRequest } from "./distanceMatrix/walking2MatrixRequest";
import { bicyclingMatrixRequest } from "./distanceMatrix/bicyclingMatrixRequest";
import { parseTripQueryRequest } from "./parseTripQueryRequest";
import { walking1DirectionsRequest } from "./directions/walking1DirectionsRequest";
import { walking2DirectionsRequest } from "./directions/walking2DirectionsRequest";
import { bicyclingDirectionsRequest } from "./directions/bicyclingDirectionsRequest";

import { TripQueryResponse } from "../shared/tripQueryResponse";

export const tripQuery = async (req): Promise<TripQueryResponse> => {
    const tripQueryRequest = parseTripQueryRequest(req);
    const newTrip = await Trip.create({});
    const processManager = new ProcessManager(tripQueryRequest, newTrip.id);
    const tripData = await getStationData(processManager)
        .then(processManager => walking1MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => walking2MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => findReservation(processManager.firstStation, processManager))
        .then(processManager => walking1DirectionsRequest(processManager))
        .then(processManager => bicyclingMatrixRequest(processManager))
        .then(processManager => findReservation(processManager.secondStation, processManager))
        .then(processManager => walking2DirectionsRequest(processManager))
        .then(processManager => bicyclingDirectionsRequest(processManager))
        .then(processManager => {
            console.log(processManager.tripData)
            return processManager.tripData
        });
    return await newTrip.update({ tripData }).then(trip => ({ tripId: trip.id, tripData: trip.tripData }));
};
