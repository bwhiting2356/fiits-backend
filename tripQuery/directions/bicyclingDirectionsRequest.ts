import { ProcessManager } from "../processManager/processManager";
import { buildDirectionsRequest } from "./buildDirectionsRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDirections } from "./fetchDirections";

export const bicyclingDirectionsRequest = (
    processManager: ProcessManager
): Promise<ProcessManager> => {
    const bicyclingRequest = buildDirectionsRequest(
        processManager.tripQueryResponse.station1Coords,
        processManager.tripQueryResponse.station2Coords,
        TravelMode.bicycling);
    return fetchDirections(bicyclingRequest)
        .then(res => {
            processManager.addBicyclingDirections(res);
            return processManager;
        })
};
