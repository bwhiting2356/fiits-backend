"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processEvent_1 = require("./processEvent");
exports.processOriginalEvent = function (state) {
    var event = state.originalQueue.shift();
    state.currentInv = processEvent_1.processEvent(state.currentInv, event.type);
    state.test.lastCheckedTime = event.time;
    return state;
};
//# sourceMappingURL=processOriginalEvent.js.map