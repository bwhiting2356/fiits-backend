import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import { TripQueryRequest } from "../../../shared/tripQueryRequest";
import { TravelMode } from "../../../shared/travelMode";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { ProcessManager } from "../tripQuery/processManager/processManager";

export const walking2MatrixRequest = (
    tripQueryRequest: TripQueryRequest,
    processManager: ProcessManager
): Promise<ProcessManager> => {

    const walkingRequest2 = buildDistanceMatrixRequest(
        tripQueryRequest.destinationAddress,
        processManager.stationDistanceData,
        TravelMode.walking
    );
    return fetchDistanceMatrix(walkingRequest2)
        .then(res => {
            processManager.addWalking2Distances(res);
            return processManager;
        });
};
