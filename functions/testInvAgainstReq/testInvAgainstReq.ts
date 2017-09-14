import { ReservEvent } from "./shared/reservEvent";
import { StationData } from "../stationData/StationData";
import { ReservRequest } from "./shared/reservRequest";
import { State } from "./shared/state";
import { TestStatus } from "./shared/teststatus";

import { isAllowed } from './isAllowed';
import { processOrDefer } from "./processOrDefer";
import { buildTestState } from "./buildTestState";

export const testInvAgainstReq = (data: ReservEvent[], station: StationData, request: ReservRequest): Boolean => {
    let state: State = buildTestState(data, station, request);
    let checking = true;

    while (checking) {

        state = processOrDefer(request, state); // process the next event

        if (request.requestTime <= state.test.lastCheckedTime) {
            state.test.status = TestStatus.active;
        }

        if (state.test.status === TestStatus.active && state.test.lastTestResult === false) {
            return state.test.lastTestResult;
        }
        if (state.originalQueue.length === 0 && state.deferredQueue.length === 0) {
            checking = false;
        }
        state = isAllowed(state, station, request); // don't redo the test until after we've made sure the last test doesn't fail
    }

    return state.test.lastTestResult;
};
