"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eventType_1 = require("../../../shared/eventType");
exports.getType = function (stationNumber) {
    return stationNumber === 1 ? eventType_1.EventType.pickup : eventType_1.EventType.dropoff;
};
//# sourceMappingURL=getType.js.map