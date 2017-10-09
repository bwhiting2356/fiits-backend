import { State } from './shared/state';
import { ReservRequest } from './shared/reservRequest';
import { StationData } from "../../stationData/stationData";
import { EventType } from "../../../../shared/eventType";

export const isAllowed = (state: State, station: StationData, request: ReservRequest): State => {
    if ((state.currentInv === 0) && (request.type === EventType.pickup)) {
        state.test.lastTestResult = false;
    } else if ((state.currentInv === station.capacity) && (request.type === EventType.dropoff)) {
        state.test.lastTestResult = false;
    } else {
        state.test.lastTestResult = true;
    }
    return state;
};
