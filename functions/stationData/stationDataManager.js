"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var compareWalking1Distance_1 = require("./compareWalking1Distance");
var compareWalking2Distance_1 = require("./compareWalking2Distance");
var compareBicyclingDistance_1 = require("./compareBicyclingDistance");
var StationDataManager = (function () {
    function StationDataManager() {
    }
    StationDataManager.prototype.initializeStations = function (stationData) {
        this.stationDistanceData = stationData.map(function (station) { return ({
            station: station
        }); });
    };
    StationDataManager.prototype.addWalking1Distances = function (walking1Results) {
        var distances = walking1Results.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].walking1Distance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    StationDataManager.prototype.addWalking2Distances = function (walking2Results) {
        var distances = walking2Results.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].walking2Distance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    StationDataManager.prototype.addBicyclingDistances = function (bicyclingResults) {
        var distances = bicyclingResults.json.rows[0].elements;
        for (var i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].byciclingDistance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    };
    Object.defineProperty(StationDataManager.prototype, "stationsWalking1Distances", {
        get: function () {
            return this.stationDistanceData.sort(compareWalking1Distance_1.compareWalking1Distance);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StationDataManager.prototype, "stationsWalking2Distances", {
        get: function () {
            return this.stationDistanceData.sort(compareWalking2Distance_1.compareWalking2Distance);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StationDataManager.prototype, "stationsBicyclingDistances", {
        get: function () {
            return this.stationDistanceData.sort(compareBicyclingDistance_1.compareBicyclingDistance);
        },
        enumerable: true,
        configurable: true
    });
    return StationDataManager;
}());
exports.StationDataManager = StationDataManager;
//# sourceMappingURL=stationDataManager.js.map