import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import { ProcessManager } from "../processManager/processManager";
import { originAddressOrCoords } from "./originAddressOrCoords";

export const walking1MatrixRequest = (
    tripQueryRequest: TripQueryRequest,
    processManager: ProcessManager
): Promise<ProcessManager> => {

    const walkingRequest1 = buildDistanceMatrixRequest(
        originAddressOrCoords(tripQueryRequest),
        processManager.stationDistanceData,
        TravelMode.walking
    );
    return fetchDistanceMatrix(walkingRequest1)
        .then(res => {
            processManager.addWalking1Distances(res);
            return processManager;
        });
};
