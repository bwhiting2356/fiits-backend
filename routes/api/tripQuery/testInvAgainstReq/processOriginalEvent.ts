import { State } from './shared/state';
import { ReservEvent } from './shared/reservEvent';

import { processEvent } from "./processEvent"

export const processOriginalEvent = (state: State): State => {
    let event: ReservEvent = state.originalQueue.shift();
    state.currentInv = processEvent(state.currentInv, event.type);
    state.test.lastCheckedTime = event.time;
    return state;
};
