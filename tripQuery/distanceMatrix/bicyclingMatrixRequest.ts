import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { StationDataManager } from "../stationData/stationDataManager";
import {ProcessManager} from "../processManager/processManager";
import {processDirection} from "../processManager/processDirection";
import {StationData} from "../stationData/stationData";

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
