import { ReservRequest } from "../../../../functions/testInvAgainstReq/shared/reservRequest";
import { StationDistanceData } from "../../stationData/stationDistanceData";
import { Reservation } from "../../../../db/db";
import { ReservationStatus } from "../../../../shared/reservationStatus";
import {ProcessManager} from "../processManager/processManager";

export const createTempReservation = async (
    request: ReservRequest,
    currentStation: StationDistanceData,
    processManager: ProcessManager) => {

    return Reservation.create({
        time: request.requestTime,
        type: request.type,
        status: ReservationStatus.temporary,
        stationId: currentStation.station.id,
        tripId: processManager.tripId,
        price: 0.50 // TODO: actually compute the price
    });
};
