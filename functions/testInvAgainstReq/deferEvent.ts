import { State } from './shared/state';
import { ReservEvent } from "./shared/reservEvent";

export const deferEvent = (state: State): State => {
    let event: ReservEvent = state.originalQueue.shift();
    event.time.setMinutes(event.time.getMinutes() + 10);
    state.deferredQueue.push(event);
    return state;
};
