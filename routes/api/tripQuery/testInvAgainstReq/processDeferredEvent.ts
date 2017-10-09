import { State } from './shared/state';
import { ReservEvent } from './shared/reservEvent';

import { processEvent } from "./processEvent";

export const processDeferredEvent = (state: State): State => {
    let event: ReservEvent = state.deferredQueue.shift();
    state.currentInv = processEvent(state.currentInv, event.type);
    state.test.lastCheckedTime = event.time;
    return state;
};
