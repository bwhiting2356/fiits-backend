"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var processDirection_1 = require("./processDirection");
var timeTarget_1 = require("../../shared/timeTarget");
var compareWalking1Distance_1 = require("../stationData/compareWalking1Distance");
var compareWalking2Distance_1 = require("../stationData/compareWalking2Distance");
var compareBicyclingDistance_1 = require("../stationData/compareBicyclingDistance");
var stationToCoords_1 = require("../stationData/stationToCoords");
var addSeconds_1 = require("../../shared/timeHelpers/addSeconds");
var subtractSeconds_1 = require("../../shared/timeHelpers/subtractSeconds");
var getBicyclingPrice_1 = require("./getBicyclingPrice");
var ProcessManager = (function () {
    function ProcessManager(tripQueryRequest) {
        this.tripQueryRequest = tripQueryRequest;
        this.tripQueryResponse = {};
        this.tripQueryResponse.originAddress = tripQueryRequest.originAddress;
        this.tripQueryResponse.destinationAddress = tripQueryRequest.destinationAddress;
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
        var distances = walking1Results.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
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
            return this.stationsWalking1Distances;
        }
        else if (stationNumber === 2) {
            return this.stationsWalking2Distances;
        }
    };
    ;
    ProcessManager.prototype.addReservResponseData = function (n, stationSuccess, reservSuccess) {
        if (n === 1) {
            this.tripQueryResponse.station1Coords = stationToCoords_1.stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station1Address = stationSuccess.station.address;
            this.tripQueryResponse.walking1Distance = stationSuccess.walking1Distance;
            this.tripQueryResponse.reservation1Time = reservSuccess.time;
            this.tripQueryResponse.reservation1Price = reservSuccess.price;
            if (this.direction === processDirection_1.processDirection.BACKWARDS) {
                this.tripQueryResponse.bicyclingDistance = stationSuccess.bicyclingDistance;
                this.tripQueryResponse.bicyclingPrice = getBicyclingPrice_1.getBicyclingPrice(stationSuccess.bicyclingDistance.duration);
                this.tripQueryResponse.arrivalTime = addSeconds_1.addSeconds(reservSuccess.time, stationSuccess.walking2Distance);
            }
        }
        else if (n === 2) {
            this.tripQueryResponse.station2Coords = stationToCoords_1.stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station2Address = stationSuccess.station.address;
            this.tripQueryResponse.walking2Distance = stationSuccess.walking2Distance;
            this.tripQueryResponse.reservation2Time = reservSuccess.time;
            this.tripQueryResponse.reservation2Price = reservSuccess.price;
            if (this.direction === processDirection_1.processDirection.FORWARDS) {
                this.tripQueryResponse.bicyclingDistance = stationSuccess.bicyclingDistance;
                this.tripQueryResponse.bicyclingPrice = getBicyclingPrice_1.getBicyclingPrice(stationSuccess.bicyclingDistance.duration);
                this.tripQueryResponse.arrivalTime = subtractSeconds_1.subtractSeconds(reservSuccess.time, stationSuccess.walking1Distance.duration);
            }
        }
    };
    ProcessManager.prototype.addWalking1Directions = function (res) {
        this.tripQueryResponse.originCoords = res.json.routes[0].legs[0].start_location;
        var steps = res.json.routes[0].legs[0].steps;
        this.tripQueryResponse.walking1Points = convertStepsToCoords(steps);
    };
    ProcessManager.prototype.addWalking2Directions = function (res) {
        this.tripQueryResponse.destinationCoords = res.json.routes[0].legs[0].end_location;
        var steps = res.json.routes[0].legs[0].steps;
        this.tripQueryResponse.walking2Points = convertStepsToCoords(steps);
    };
    ProcessManager.prototype.addBicyclingDirections = function (res) {
        var steps = res.json.routes[0].legs[0].steps;
        this.tripQueryResponse.bicyclingPoints = convertStepsToCoords(steps);
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
var convertStepsToCoords = function (steps) {
    var allCoords = new Set();
    steps.forEach(function (step) {
        allCoords.add(step.start_location);
        allCoords.add(step.end_location);
    });
    return Array.from(allCoords);
};
//# sourceMappingURL=processManager.js.map