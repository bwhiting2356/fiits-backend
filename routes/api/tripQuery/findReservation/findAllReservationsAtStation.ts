import { StationDistanceData } from "../../stationData/stationDistanceData";
import { Reservation } from "../../../../db/db";

export const findAllReservationsAtStation = async (currentStation: StationDistanceData) => {
    return Reservation.findAll({
        where: {
            stationId: currentStation.station.id
        }
    });
};
