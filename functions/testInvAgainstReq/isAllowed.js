"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventType_1 = require("../../shared/eventType");
exports.isAllowed = function (state, station, request) {
    if ((state.currentInv === 0) && (request.type === eventType_1.EventType.pickup)) {
        state.test.lastTestResult = false;
    }
    else if ((state.currentInv === station.capacity) && (request.type === eventType_1.EventType.dropoff)) {
        state.test.lastTestResult = false;
    }
    else {
        state.test.lastTestResult = true;
    }
    return state;
};
//# sourceMappingURL=isAllowed.js.map