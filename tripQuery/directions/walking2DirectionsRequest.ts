import { ProcessManager } from "../processManager/processManager";
import { buildDirectionsRequest } from "./buildDirectionsRequest";
import { TravelMode } from "../../shared/travelMode";
import { fetchDirections } from "./fetchDirections";

export const walking2DirectionsRequest = (
    processManager: ProcessManager
): Promise<ProcessManager> => {
    const walkingRequest2 = buildDirectionsRequest(
        processManager.tripData.station2Coords,
        processManager.tripData.destinationAddress,
        TravelMode.walking);
    return fetchDirections(walkingRequest2)
        .then(res => {
            processManager.addWalking2Directions(res);
            return processManager;
        })
};
