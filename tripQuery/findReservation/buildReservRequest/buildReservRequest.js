"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTime_1 = require("./getTime");
var getType_1 = require("./getType");
exports.buildReservRequest = function (stationNumber, processManager, currentStation) {
    return {
        currentTime: new Date(),
        requestTime: getTime_1.getTime(stationNumber, processManager, currentStation),
        type: getType_1.getType(stationNumber)
    };
};
//# sourceMappingURL=buildReservRequest.js.map