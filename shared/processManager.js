"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("./processDirection");
var timeTarget_1 = require("./timeTarget");
var ProcessManager = (function () {
    function ProcessManager(tripQueryRequest) {
        this.tripQueryRequest = tripQueryRequest;
        this.direction = tripQueryRequest.timeTarget === timeTarget_1.TimeTarget.ARRIVE_BY
            ? processDirection_1.processDirection.BACKWARDS
            : processDirection_1.processDirection.FORWARDS;
        if (this.direction === processDirection_1.processDirection.FORWARDS) {
            this.departureTime = tripQueryRequest.time;
        }
        else if (this.direction === processDirection_1.processDirection.BACKWARDS) {
            this.arrivalTime = tripQueryRequest.time;
        }
    }
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
//
// export interface TripQueryResponse {
//     origin: Coords;
//     departureTime: Date;
//
//     walking1Points: Coords[];
//     walking1Duration: number;
//     walking1DistanceText: string;
//
//     station1: Coords;
//     reservation1StartTime: Date;
//     reservation1EndTime: Date;
//     reservation1Price: number
//
//     bicyclingPoints: Coords[];
//     bicyclingDuration: number;
//     bicyclingDistanceText: string;
//     bicyclingPrice: number;
//
//     station2: Coords;
//     reservation2StartTime: Date;
//     reservation2EndTime: Date;
//     reservation2Price: Date;
//
//     walking2Points: Coords[];
//     walking2Duration: number;
//     walking2DistanceText: string;
//
//     destination: Coords;
//     arrivalTime: Date;
// }
//# sourceMappingURL=processManager.js.map