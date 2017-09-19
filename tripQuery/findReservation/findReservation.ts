import { StationDistanceData } from "../stationData/stationDistanceData";
import { ReservRequest } from "../../functions/testInvAgainstReq/shared/reservRequest";
import { testInvAgainstReq } from "../../functions/testInvAgainstReq/testInvAgainstReq";
import { buildReservRequest } from "./buildReservRequest/buildReservRequest";
import { ProcessManager } from "../processManager/processManager";
import { findAllReservationsAtStation } from "./findAllReservationsAtStation";
import { createTempReservation } from "./createTempReservation";

export const findReservation = async (
    stationNumber: number,
    processManager: ProcessManager
    ): Promise<ProcessManager> => {

    const stationDistanceData: StationDistanceData[] = processManager.getStationDistanceData(
        stationNumber
    );

    let checking = true;
    let reservSuccess;
    let stationSuccess;
    while (checking && stationDistanceData.length) {
        const currentStation = stationDistanceData.shift();
        const reservations = await findAllReservationsAtStation(currentStation);
        let request: ReservRequest = buildReservRequest(stationNumber, processManager, currentStation);
        const result = testInvAgainstReq(reservations, currentStation.station, request);

        if (result) {
            checking = false;
            reservSuccess = await createTempReservation(request, currentStation);
            stationSuccess = currentStation;
        }
    }
    if (reservSuccess) {
        processManager.addResponseData(stationNumber, stationSuccess, reservSuccess);
        return processManager;
    } else {
        throw new Error('No reservations available') // TODO: more detailed error message, handle error
    }
};