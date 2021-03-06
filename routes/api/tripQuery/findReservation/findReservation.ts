import { StationDistanceData } from "../../stationData/stationDistanceData";
// import { testInvAgainstReq } from "../../../../functions/testInvAgainstReq/testInvAgainstReq";
import { buildReservRequest } from "./buildReservRequest/buildReservRequest";
import { ProcessManager } from "../processManager/processManager";
import { findAllReservationsAtStation } from "./findAllReservationsAtStation";
import { createTempReservation } from "./createTempReservation";
import { ReservRequest } from "../testInvAgainstReq/shared/reservRequest";
import { testInvAgainstReq } from "../testInvAgainstReq/testInvAgainstReq";
// import { ReservRequest } from "../../../../functions/testInvAgainstReq/shared/reservRequest";

export const findReservation = async (
    stationNumber: number,
    processManager: ProcessManager
    ): Promise<ProcessManager> => {

    const stationDistanceData: StationDistanceData[] = processManager.getStationDistanceData(
        stationNumber
    );

    let checking = true;
    let reservSuccess;
    let stationSuccess: StationDistanceData;
    while (checking && stationDistanceData.length) {
        const currentStation = stationDistanceData.shift();
        // TODO: don't remove item from array, just reference and increment a pointer
        // so that someone could theoretically return to the same station they left from if they want

        const reservations = await findAllReservationsAtStation(currentStation);
        let request: ReservRequest = buildReservRequest(stationNumber, processManager, currentStation);
        const result = testInvAgainstReq(reservations, currentStation.station, request);

        if (result) {
            checking = false;
            reservSuccess = await createTempReservation(request, currentStation, processManager);
            stationSuccess = currentStation;
        }
    }
    if (reservSuccess) {
        processManager.addReservResponseData(stationNumber, stationSuccess, reservSuccess);
        return processManager;
    } else {
        throw new Error('No reservations available') // TODO: more detailed error message, handle error
    }
};
