import { Reservation } from "../db/db";

import { EventType} from "../shared/eventType";
import { ReservationStatus} from "../shared/reservationStatus";
import { TripQueryRequest } from "../shared/tripQueryRequest";
import { StationDistanceData } from "./stationData/stationDistanceData";

import { testInvAgainstReq } from "./testInvAgainstReq/testInvAgainstReq";
import { ReservRequest } from "./testInvAgainstReq/shared/reservRequest";
import { ReservationResponse } from "./reservationResponse";
import {addSeconds} from "./addSeconds";

export const findFirstReservation = async (
    stationDistanceDataList: StationDistanceData[],
    tripQueryRequest: TripQueryRequest): Promise<ReservationResponse> => {

    let checking = true;
    let reservSuccess;
    let stationSuccess;
    while (checking && stationDistanceDataList.length) {

        const currentStation = stationDistanceDataList.shift();
        const reservations = await Reservation.findAll({
            where: {
                stationId: currentStation.station.id
            }
        });
        let time = addSeconds(tripQueryRequest.time, currentStation.walking1Distance.duration);

        const request: ReservRequest = {
            currentTime: new Date(),
            requestTime: time,
            type: EventType.pickup
        };
        const result = testInvAgainstReq(reservations, currentStation.station, request);
        if (result) {
            checking = false;
            reservSuccess = await Reservation.create({
                time: request.requestTime,
                type: request.type,
                status: ReservationStatus.temporary,
                stationId: currentStation.station.id
            });
            stationSuccess = currentStation;
        }
    }
    return {
        reservation: reservSuccess,
        station: stationSuccess
    };
    // TODO: throw an error if i couldnt get a reservation
};
