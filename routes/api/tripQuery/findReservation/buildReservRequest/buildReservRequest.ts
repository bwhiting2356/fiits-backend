import { StationDistanceData } from "../../../stationData/stationDistanceData";
import { ReservRequest } from "../../../../../functions/testInvAgainstReq/shared/reservRequest";
import { ProcessManager } from "../../processManager/processManager";
import { getTime } from "./getTime";
import { getType } from "./getType";

export const buildReservRequest = (
    stationNumber: number,
    processManager: ProcessManager,
    currentStation: StationDistanceData
    ): ReservRequest => {

    return {
        currentTime: new Date(),
        requestTime: getTime(stationNumber, processManager, currentStation),
        type: getType(stationNumber)
    };
};
