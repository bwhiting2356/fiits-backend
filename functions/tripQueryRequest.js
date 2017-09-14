"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var processManager_1 = require("../shared/processManager");
var getStationDataFromDB_1 = require("./getStationDataFromDB");
var fetchDistanceMatrix_1 = require("./fetchDistanceMatrix");
var processDirection_1 = require("../shared/processDirection");
var getDataValuesFromStations_1 = require("./getDataValuesFromStations");
var findFirstReservation_1 = require("./findFirstReservation");
var travelMode_1 = require("../shared/travelMode");
var stationDataManager_1 = require("./stationData/stationDataManager");
var buildDistanceMatrixRequest_1 = require("./buildDistanceMatrixRequest");
var findSecondReservation_1 = require("./findSecondReservation");
var addSeconds_1 = require("./addSeconds");
var fetchDirections_1 = require("./fetchDirections");
exports.tripQueryRequest = function (tripQueryRequest) { return __awaiter(_this, void 0, void 0, function () {
    var processManager, stationDataManager, stationData, tripQueryResponse_1, walkingRequest1, walkingRequest1Promise, walkingRequest2, walkingRequest2Promise, walkingDirections1, reservation1Success, all;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                processManager = new processManager_1.ProcessManager(tripQueryRequest);
                stationDataManager = new stationDataManager_1.StationDataManager();
                return [4 /*yield*/, getStationDataFromDB_1.getStationDataFromDB().then(function (data) { return getDataValuesFromStations_1.getDataValuesFromStations(data); })];
            case 1:
                stationData = _a.sent();
                stationDataManager.initializeStations(stationData);
                if (!(processManager.direction === processDirection_1.processDirection.FORWARDS)) return [3 /*break*/, 3];
                tripQueryResponse_1 = {
                    tripQueryRequest: tripQueryRequest,
                    reservation1: undefined,
                    station1: undefined,
                    reservation2: undefined,
                    station2: undefined,
                    leave: tripQueryRequest.time,
                    arrive: undefined,
                    walkingDirections1: undefined,
                    bicyclingDirections: undefined,
                    walkingDirections2: undefined
                };
                walkingRequest1 = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(tripQueryRequest.origin, stationDataManager, travelMode_1.TravelMode.walking);
                walkingRequest1Promise = fetchDistanceMatrix_1.fetchDistanceMatrix(walkingRequest1)
                    .then(function (distanceMatrixResults) {
                    stationDataManager.addWalking1Distances(distanceMatrixResults);
                });
                walkingRequest2 = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(tripQueryRequest.destination, stationDataManager, travelMode_1.TravelMode.walking);
                walkingRequest2Promise = fetchDistanceMatrix_1.fetchDistanceMatrix(walkingRequest2)
                    .then(function (distanceMatrixResults) {
                    stationDataManager.addWalking2Distances(distanceMatrixResults);
                });
                walkingDirections1 = void 0;
                reservation1Success = walkingRequest1Promise
                    .then(function (h) {
                    return findFirstReservation_1.findFirstReservation(stationDataManager.stationsWalking1Distances, tripQueryRequest);
                })
                    .then(function (reservation1) {
                    fetchDirections_1.fetchDirections(tripQueryRequest.origin, reservation1.station.station, travelMode_1.TravelMode.walking)
                        .then(function (walkingDirectionsReponse) {
                        tripQueryResponse_1.walkingDirections1 = walkingDirectionsReponse;
                    });
                    return reservation1;
                });
                all = Promise.all([walkingRequest2Promise, reservation1Success]).then(function (results) {
                    tripQueryResponse_1.reservation1 = results[1].reservation;
                    tripQueryResponse_1.station1 = results[1].station;
                    var bicyclingRequest = buildDistanceMatrixRequest_1.buildDistanceMatrixRequest(results[1].station.station, stationDataManager, travelMode_1.TravelMode.bicycling);
                    return fetchDistanceMatrix_1.fetchDistanceMatrix(bicyclingRequest).then(function (distanceMatrixResults) {
                        stationDataManager.addBicyclingDistances(distanceMatrixResults);
                    })
                        .then(function () {
                        return findSecondReservation_1.findSecondReservation(stationDataManager.stationsWalking2Distances, results[1].reservation);
                    })
                        .then(function (reservation2) {
                        tripQueryResponse_1.reservation2 = reservation2.reservation;
                        tripQueryResponse_1.station2 = reservation2.station;
                        tripQueryResponse_1.arrive = addSeconds_1.addSeconds(reservation2.reservation.time, reservation2.station.walking2Distance.duration);
                        return fetchDirections_1.fetchDirections(tripQueryRequest.destination, reservation2.station.station, travelMode_1.TravelMode.walking)
                            .then(function (walkingDirectionsReponse) {
                            return tripQueryResponse_1.walkingDirections2 = walkingDirectionsReponse;
                        });
                    })
                        .then(function () {
                        return fetchDirections_1.fetchDirections(tripQueryResponse_1.station1.station, tripQueryResponse_1.station2.station, travelMode_1.TravelMode.bicycling)
                            .then(function (directionsResponse) {
                            tripQueryResponse_1.bicyclingDirections = directionsResponse;
                            console.log(tripQueryResponse_1);
                            return tripQueryResponse_1;
                        });
                    }).then(function (tripQueryResponse) { return tripQueryResponse; });
                });
                return [4 /*yield*/, all];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                if (processManager.direction === processDirection_1.processDirection.BACKWARDS) {
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
var tqr = {
    origin: {
        lat: 40.694983,
        lng: -73.949382
    },
    destination: {
        lat: 40.684294,
        lng: -73.915099
    },
    time: new Date(),
    timeTarget: 'Leave now'
};
exports.tripQueryRequest(tqr).then(function (result) { return console.log("\n\n\n I'm finally at the end", result); });
//# sourceMappingURL=tripQueryRequest.js.map