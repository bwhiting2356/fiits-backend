import { ProcessManager } from "../../processManager/processManager";
import { StationDistanceData } from "../../stationData/stationDistanceData";
import { processDirection } from "../../processManager/processDirection";
import { addSeconds } from "../../../shared/timeHelpers/addSeconds";

export const getTime = (
    stationNumber: number,
    processManager: ProcessManager,
    currentStation: StationDistanceData): Date => {

    if (stationNumber === 1) {
        if (processManager.direction === processDirection.FORWARDS) {
            return addSeconds(
                processManager.tripQueryResponse.departureTime,
                currentStation.walking1Distance.duration
            );
        } else if (processManager.direction === processDirection.BACKWARDS) {
            return addSeconds(
                processManager.tripQueryResponse.reservation2Time,
                currentStation.bicyclingDistance.duration);
        }
    } else if (stationNumber === 2) {
        if (processManager.direction === processDirection.FORWARDS) {
            return addSeconds(
                processManager.tripQueryResponse.reservation1Time,
                currentStation.bicyclingDistance.duration
            );
        } else if (processManager.direction === processDirection.BACKWARDS) {
            return addSeconds(
                processManager.tripQueryResponse.arrivalTime,
                currentStation.walking2Distance.duration
            );
        }
    }
};
