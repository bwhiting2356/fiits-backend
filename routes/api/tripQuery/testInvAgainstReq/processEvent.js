"use strict";
// import { EventType } from "../../shared/eventType"
Object.defineProperty(exports, "__esModule", { value: true });
var eventType_1 = require("../../../../shared/eventType");
exports.processEvent = function (currentInv, eventType) {
    if (eventType === eventType_1.EventType.pickup) {
        return currentInv - 1;
    }
    else if (eventType === eventType_1.EventType.dropoff) {
        return currentInv + 1;
    }
};
//# sourceMappingURL=processEvent.js.map