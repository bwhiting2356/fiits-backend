import { ProcessManager } from "../processManager/processManager";
import { buildDirectionsRequest } from "./buildDirectionsRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDirections } from "./fetchDirections";

export const walking1DirectionsRequest = (
    processManager: ProcessManager
): Promise<ProcessManager> => {
    const origin = processManager.tripData.originCoords
        ? processManager.tripData.originCoords
        : processManager.tripData.originAddress;

    const walkingRequest1 = buildDirectionsRequest(
        origin,
        processManager.tripData.station1Coords,
        TravelMode.walking);
    return fetchDirections(walkingRequest1)
        .then(res => {
            processManager.addWalking1Directions(res);
            return processManager;
        })
};
