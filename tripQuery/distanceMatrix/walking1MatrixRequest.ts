import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import {ProcessManager} from "../processManager/processManager";

export const walking1MatrixRequest = (
    tripQueryRequest: TripQueryRequest,
    processManager: ProcessManager
): Promise<ProcessManager> => {

    const origin = tripQueryRequest.originAddress !== 'Current Location'
        ? tripQueryRequest.originAddress
        : tripQueryRequest.originCoords;

    const walkingRequest1 = buildDistanceMatrixRequest(
        origin,
        processManager.stationDistanceData,
        TravelMode.walking
    );
    console.log(walkingRequest1);
    return fetchDistanceMatrix(walkingRequest1)
        .then(res => {
            processManager.addWalking1Distances(res);
            return processManager;
        });
};
