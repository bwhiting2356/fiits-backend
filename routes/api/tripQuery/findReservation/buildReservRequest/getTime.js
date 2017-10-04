"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("../../processManager/processDirection");
var addSeconds_1 = require("../../../../../shared/timeHelpers/addSeconds");
exports.getTime = function (stationNumber, processManager, currentStation) {
    if (stationNumber === 1) {
        if (processManager.direction === processDirection_1.processDirection.FORWARDS) {
            return addSeconds_1.addSeconds(processManager.tripData.departureTime, currentStation.walking1Distance.duration);
        }
        else if (processManager.direction === processDirection_1.processDirection.BACKWARDS) {
            return addSeconds_1.addSeconds(processManager.tripData.reservation2Time, currentStation.bicyclingDistance.duration);
        }
    }
    else if (stationNumber === 2) {
        if (processManager.direction === processDirection_1.processDirection.FORWARDS) {
            return addSeconds_1.addSeconds(processManager.tripData.reservation1Time, currentStation.bicyclingDistance.duration);
        }
        else if (processManager.direction === processDirection_1.processDirection.BACKWARDS) {
            return addSeconds_1.addSeconds(processManager.tripData.arrivalTime, currentStation.walking2Distance.duration);
        }
    }
};
//# sourceMappingURL=getTime.js.map