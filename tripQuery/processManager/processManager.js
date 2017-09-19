"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("./processDirection");
var timeTarget_1 = require("../../shared/timeTarget");
var compareWalking1Distance_1 = require("../stationData/compareWalking1Distance");
var compareWalking2Distance_1 = require("../stationData/compareWalking2Distance");
var compareBicyclingDistance_1 = require("../stationData/compareBicyclingDistance");
var stationToCoords_1 = require("../stationData/stationToCoords");
var ProcessManager = (function () {
    function ProcessManager(tripQueryRequest) {
        this.tripQueryRequest = tripQueryRequest;
        this.tripQueryResponse = {};
        this.tripQueryResponse.originAddress = tripQueryRequest.origin;
        this.tripQueryResponse.destinationAddress = tripQueryRequest.destination;
        this.direction = tripQueryRequest.timeTarget === timeTarget_1.TimeTarget.ARRIVE_BY
            ? processDirection_1.processDirection.BACKWARDS
            : processDirection_1.processDirection.FORWARDS;
        if (this.direction === processDirection_1.processDirection.FORWARDS) {
            this.tripQueryResponse.departureTime = tripQueryRequest.time;
        }
        else if (this.direction === processDirection_1.processDirection.BACKWARDS) {
            this.tripQueryResponse.arrivalTime = tripQueryRequest.time;
        }
    }
    ProcessManager.prototype.addStationData = function (stationData) {
        this.stationDistanceData = stationData.map(function (station) { return ({
            station: station
        }); });
    };
    ProcessManager.prototype.addWalking1Distances = function (walking1Results) {
        console.log(walking1Results);
        var distances = walking1Results.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            console.log(distances[i]);
            this.stationDistanceData[i].walking1Distance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    ProcessManager.prototype.addWalking2Distances = function (walking2Results) {
        var distances = walking2Results.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].walking2Distance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    ProcessManager.prototype.addBicyclingDistances = function (bicyclingResults) {
        var distances = bicyclingResults.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].bicyclingDistance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    Object.defineProperty(ProcessManager.prototype, "stationsWalking1Distances", {
        get: function () {
            return this.stationDistanceData.sort(compareWalking1Distance_1.compareWalking1Distance);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessManager.prototype, "stationsWalking2Distances", {
        get: function () {
            return this.stationDistanceData.sort(compareWalking2Distance_1.compareWalking2Distance);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessManager.prototype, "stationsBicyclingDistances", {
        get: function () {
            return this.stationDistanceData.sort(compareBicyclingDistance_1.compareBicyclingDistance);
        },
        enumerable: true,
        configurable: true
    });
    ProcessManager.prototype.getStationDistanceData = function (stationNumber) {
        if (stationNumber === 1) {
            if (this.direction === processDirection_1.processDirection.FORWARDS) {
                return this.stationsWalking1Distances;
            }
            else if (this.direction === processDirection_1.processDirection.BACKWARDS) {
                return this.stationsBicyclingDistances;
            }
        }
        else if (stationNumber === 2) {
            if (this.direction === processDirection_1.processDirection.FORWARDS) {
                return this.stationsBicyclingDistances;
            }
            else if (this.direction === processDirection_1.processDirection.BACKWARDS) {
                return this.stationsWalking2Distances;
            }
        }
    };
    ;
    ProcessManager.prototype.addResponseData = function (n, stationSuccess, reservSuccess) {
        if (n === 1) {
            this.tripQueryResponse.station1Coords = stationToCoords_1.stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station1Address = stationSuccess.station.address;
            this.tripQueryResponse.walking1Distance = stationSuccess.walking1Distance;
            this.tripQueryResponse.reservation1Time = reservSuccess.time;
        }
        else if (n === 2) {
            this.tripQueryResponse.station2Coords = stationToCoords_1.stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station2Address = stationSuccess.station.address;
            this.tripQueryResponse.walking2Distance = stationSuccess.walking2Distance;
            this.tripQueryResponse.reservation2Time = reservSuccess.time;
        }
        if (n === 2 && this.direction === processDirection_1.processDirection.FORWARDS ||
            n === 1 && this.direction === processDirection_1.processDirection.BACKWARDS) {
            this.tripQueryResponse.bicyclingDistance = stationSuccess.bicyclingDistance;
        }
    };
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
    Object.defineProperty(ProcessManager.prototype, "firstStation", {
        get: function () {
            return this.direction === processDirection_1.processDirection.FORWARDS ? 1 : 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessManager.prototype, "secondStation", {
        get: function () {
            return this.direction === processDirection_1.processDirection.FORWARDS ? 2 : 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProcessManager.prototype, "bicyclingOriginStation", {
        get: function () {
            return this.direction === processDirection_1.processDirection.FORWARDS
                ? this.tripQueryResponse.station1Coords
                : this.tripQueryResponse.station2Coords;
        },
        enumerable: true,
        configurable: true
    });
    return ProcessManager;
}());
exports.ProcessManager = ProcessManager;
//# sourceMappingURL=processManager.js.map
