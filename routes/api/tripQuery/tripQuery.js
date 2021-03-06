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
var db_1 = require("../../../db/db");
var getStationData_1 = require("../stationData/getStationData");
var findReservation_1 = require("./findReservation/findReservation");
var processManager_1 = require("./processManager/processManager");
var walking1MatrixRequest_1 = require("../distanceMatrix/walking1MatrixRequest");
var walking2MatrixRequest_1 = require("../distanceMatrix/walking2MatrixRequest");
var bicyclingMatrixRequest_1 = require("../distanceMatrix/bicyclingMatrixRequest");
var parseTripQueryRequest_1 = require("./parseTripQueryRequest");
var walking1DirectionsRequest_1 = require("./directions/walking1DirectionsRequest");
var walking2DirectionsRequest_1 = require("./directions/walking2DirectionsRequest");
var bicyclingDirectionsRequest_1 = require("./directions/bicyclingDirectionsRequest");
exports.tripQuery = function (req) { return __awaiter(_this, void 0, void 0, function () {
    var tripQueryRequest, newTrip, processManager, tripData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripQueryRequest = parseTripQueryRequest_1.parseTripQueryRequest(req);
                return [4 /*yield*/, db_1.Trip.create({})];
            case 1:
                newTrip = _a.sent();
                processManager = new processManager_1.ProcessManager(tripQueryRequest, newTrip.id);
                return [4 /*yield*/, getStationData_1.getStationData(processManager)
                        .then(function (processManager) { return walking1MatrixRequest_1.walking1MatrixRequest(tripQueryRequest, processManager); })
                        .then(function (processManager) { return walking2MatrixRequest_1.walking2MatrixRequest(tripQueryRequest, processManager); })
                        .then(function (processManager) { return findReservation_1.findReservation(processManager.firstStation, processManager); })
                        .then(function (processManager) { return walking1DirectionsRequest_1.walking1DirectionsRequest(processManager); })
                        .then(function (processManager) { return bicyclingMatrixRequest_1.bicyclingMatrixRequest(processManager); })
                        .then(function (processManager) { return findReservation_1.findReservation(processManager.secondStation, processManager); })
                        .then(function (processManager) { return walking2DirectionsRequest_1.walking2DirectionsRequest(processManager); })
                        .then(function (processManager) { return bicyclingDirectionsRequest_1.bicyclingDirectionsRequest(processManager); })
                        .then(function (processManager) {
                        console.log(processManager.tripData);
                        return processManager.tripData;
                    })];
            case 2:
                tripData = _a.sent();
                return [4 /*yield*/, newTrip.update({ tripData: tripData }).then(function (trip) { return ({ tripId: trip.id, tripData: trip.tripData }); })];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=tripQuery.js.map