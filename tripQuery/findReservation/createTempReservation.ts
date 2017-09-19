import { ReservRequest } from "../../functions/testInvAgainstReq/shared/reservRequest";
import { StationDistanceData } from "../stationData/stationDistanceData";
import { Reservation } from "../../db/db";
import { ReservationStatus } from "../../shared/reservationStatus";

export const createTempReservation = async (
    request: ReservRequest,
    currentStation: StationDistanceData) => {

    return Reservation.create({
        time: request.requestTime,
        type: request.type,
        status: ReservationStatus.temporary,
        stationId: currentStation.station.id,
        price: 0.75 // TODO: actually compute the price
    });
};
