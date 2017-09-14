"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processOriginalEvent_1 = require("./processOriginalEvent");
var processDeferredEvent_1 = require("./processDeferredEvent");
var deferEvent_1 = require("./deferEvent");
exports.processOrDefer = function (request, state) {
    if (state.originalQueue.length && state.deferredQueue.length) {
        if (state.originalQueue[0].time < state.deferredQueue[0].time) {
            // pop off event from originalQueue
            if (request.type === state.originalQueue[0].type) {
                state = processOriginalEvent_1.processOriginalEvent(state);
            }
            else {
                state = deferEvent_1.deferEvent(state);
            }
        }
        else {
            // process event from deferred queue. process it now because we've already deferred it
            state = processDeferredEvent_1.processDeferredEvent(state);
        }
    }
    else if (state.originalQueue.length && !state.deferredQueue.length) {
        // pop off event from originalQueue
        var event = state.originalQueue[0];
        if (request.type === event.type) {
            state = processOriginalEvent_1.processOriginalEvent(state);
        }
        else {
            state = deferEvent_1.deferEvent(state);
        }
    }
    else if (!state.originalQueue.length && state.deferredQueue.length) {
        // process event from deferred queue. process it now because we've already deferred it
        state = processDeferredEvent_1.processDeferredEvent(state);
    }
    return state;
};
//# sourceMappingURL=processOrDefer.js.map