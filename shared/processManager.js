"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("./processDirection");
var timeTarget_1 = require("./timeTarget");
var getStationDataFromDB_1 = require("../functions/getStationDataFromDB");
var ProcessManager = (function () {
    function ProcessManager(tripQueryRequest) {
        this.direction = tripQueryRequest.timeTarget === timeTarget_1.TimeTarget.ARRIVE_BY
            ? processDirection_1.processDirection.BACKWARDS
            : processDirection_1.processDirection.FORWARDS;
    }
    ProcessManager.prototype.getStationData = function () {
        this.stationDataPromise = getStationDataFromDB_1.getStationDataFromDB();
    };
    ProcessManager.prototype.getStation1 = function () {
        this.stationDataPromise.then();
    };
    ProcessManager.prototype.getWalkingDirections1 = function () {
    };
    ProcessManager.prototype.getStation2 = function () {
    };
    ProcessManager.prototype.getWalkingDirections2 = function () {
    };
    ProcessManager.prototype.getBikeDirections = function () {
    };
    ProcessManager.prototype.sendResponse = function () {
        // Promise.all(promises)
    };
    Object.defineProperty(ProcessManager.prototype, "processFirst", {
        get: function () {
            if (this.direction === processDirection_1.processDirection.FORWARDS) {
                return this.walking1StationDistancePairs;
            }
            else {
                return this.walking2StationDistancePairs;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessManager.prototype, "processSecond", {
        get: function () {
            if (this.direction === processDirection_1.processDirection.FORWARDS) {
                return this.walking2StationDistancePairs;
            }
            else {
                return this.walking1StationDistancePairs;
            }
        },
        enumerable: true,
        configurable: true
    });
    ProcessManager.prototype.getStationArrivalTime = function (time, stationDistancePair) {
        var newDate;
        if (this.direction === processDirection_1.processDirection.FORWARDS) {
            newDate.setSeconds(time.getSeconds() + stationDistancePair.distance.duration.value);
        }
        else {
            newDate.setSeconds(time.getSeconds() - stationDistancePair.distance.duration.value);
        }
        return newDate;
    };
    return ProcessManager;
}());
exports.ProcessManager = ProcessManager;
//# sourceMappingURL=processManager.js.map