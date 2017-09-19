"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("../../processManager/processDirection");
var addSeconds_1 = require("../../../functions/addSeconds");
exports.getTime = function (stationNumber, processManager, currentStation) {
    if (stationNumber === 1) {
        if (processManager.direction === processDirection_1.processDirection.FORWARDS) {
            return addSeconds_1.addSeconds(processManager.tripQueryResponse.departureTime, currentStation.walking1Distance.duration);
        }
        else if (processManager.direction === processDirection_1.processDirection.BACKWARDS) {
            return addSeconds_1.addSeconds(processManager.tripQueryResponse.reservation2Time, currentStation.bicyclingDistance.duration);
        }
    }
    else if (stationNumber === 2) {
        if (processManager.direction === processDirection_1.processDirection.FORWARDS) {
            return addSeconds_1.addSeconds(processManager.tripQueryResponse.reservation1Time, currentStation.bicyclingDistance.duration);
        }
        else if (processManager.direction === processDirection_1.processDirection.BACKWARDS) {
            return addSeconds_1.addSeconds(processManager.tripQueryResponse.arrivalTime, currentStation.walking2Distance.duration);
        }
    }
};
//# sourceMappingURL=getTime.js.map