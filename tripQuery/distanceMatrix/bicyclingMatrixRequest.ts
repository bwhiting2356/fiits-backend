import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { ProcessManager } from "../processManager/processManager";

export const bicyclingMatrixRequest = (
    processManager: ProcessManager,
): Promise<ProcessManager> => {

    const bicyclingRequest = buildDistanceMatrixRequest(
        processManager.bicyclingOriginStation,
        processManager.stationDistanceData,
        TravelMode.bicycling
    );
    return fetchDistanceMatrix(bicyclingRequest)
        .then(res => {
            processManager.addBicyclingDistances(res);
            return processManager;
        });
};
