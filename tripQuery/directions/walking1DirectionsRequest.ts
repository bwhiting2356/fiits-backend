import { ProcessManager } from "../processManager/processManager";
import { buildDirectionsRequest } from "./buildDirectionsRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDirections } from "./fetchDirections";

export const walking1DirectionsRequest = (
    processManager: ProcessManager
): Promise<ProcessManager> => {
    const origin = processManager.tripQueryResponse.originCoords
        ? processManager.tripQueryResponse.originCoords
        : processManager.tripQueryResponse.originAddress;

    const walkingRequest1 = buildDirectionsRequest(
        origin,
        processManager.tripQueryResponse.station1Coords,
        TravelMode.walking);
    return fetchDirections(walkingRequest1)
        .then(res => {
            processManager.addWalking1Directions(res);
            return processManager;
        })
};
