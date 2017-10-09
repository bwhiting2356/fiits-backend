import { ReservEvent } from "./shared/reservEvent";
import { ReservRequest } from './shared/reservRequest';
import { State } from './shared/state';
import { TestStatus } from './shared/teststatus';
import { StationData } from "../stationData/StationData";

export const buildTestState = (data: ReservEvent[], station: StationData, request: ReservRequest): State => {
    return {
        originalQueue: data,
        deferredQueue: [],
        currentInv: station.currentInv,
        test: {
            status: TestStatus.pending,
            lastTestResult: undefined,
            lastCheckedTime: request.currentTime
        }
    };
};
