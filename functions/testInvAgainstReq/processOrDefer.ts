import { ReservRequest} from "./shared/reservRequest";
import { State } from './shared/state';

import { processOriginalEvent } from './processOriginalEvent';
import { processDeferredEvent } from "./processDeferredEvent";
import { deferEvent } from './deferEvent';

export const processOrDefer = (request: ReservRequest, state: State): State => {
    if (state.originalQueue.length && state.deferredQueue.length) { // both queues have events in them
        if (state.originalQueue[0].time < state.deferredQueue[0].time) { // first item in originalQueue comes earlier
            // pop off event from originalQueue
            if (request.type === state.originalQueue[0].type) { // if event type is the same as the request, process now
                state = processOriginalEvent(state)
            } else { // if it's the opposite type, add to deferredQueue
                state = deferEvent(state);

            }
        } else { // first
            // process event from deferred queue. process it now because we've already deferred it
            state = processDeferredEvent(state);
        }

    } else if (state.originalQueue.length && !state.deferredQueue.length) { // deferredQueue is empty
        // pop off event from originalQueue
        let event = state.originalQueue[0];
        if (request.type === event.type) { // if event type is the same as the request, process now
            state = processOriginalEvent(state);
        } else { // if it's the opposite type, add to deferredQueue
            state = deferEvent(state);
        }

    } else if (!state.originalQueue.length && state.deferredQueue.length) { // originalQueue is empty
        // process event from deferred queue. process it now because we've already deferred it
        state = processDeferredEvent(state);
    }

    return state;
};
