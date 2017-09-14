"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deferEvent = function (state) {
    var event = state.originalQueue.shift();
    event.time.setMinutes(event.time.getMinutes() + 10);
    state.deferredQueue.push(event);
    return state;
};
//# sourceMappingURL=deferEvent.js.map