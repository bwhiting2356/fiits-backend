import { TripQueryRequest } from "../shared/tripQueryRequest";
import { getStationData } from "./stationData/getStationData";
import { findReservation } from "./findReservation/findReservation";
import { ProcessManager } from "./processManager/processManager";
import { walking1MatrixRequest } from "./distanceMatrix/walking1MatrixRequest";
import { walking2MatrixRequest } from "./distanceMatrix/walking2MatrixRequest";
import { bicyclingMatrixRequest } from "./distanceMatrix/bicyclingMatrixRequest";
import { TripQueryResponse } from "../shared/tripQueryResponse";

export const tripQuery = async (
    tripQueryRequest: TripQueryRequest
): Promise<TripQueryResponse> => {
    console.log(tripQueryRequest);
    const processManager = new ProcessManager(tripQueryRequest);
    return getStationData(processManager)
        .then(processManager => walking1MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => walking2MatrixRequest(tripQueryRequest, processManager))
        .then(processManager => findReservation(processManager.firstStation, processManager))
        .then(processManager => bicyclingMatrixRequest(processManager))
        .then(processManager => findReservation(processManager.secondStation, processManager))
        .then(processManager => processManager.tripQueryResponse);
};
