"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var processManager_1 = require("../shared/processManager");
var processDirection_1 = require("../shared/processDirection");
var timeTarget_1 = require("../shared/timeTarget");
describe('test ProcessManager', function () {
    var tqr;
    var stationDistancePairs;
    beforeEach(function () {
        tqr = {
            origin: {
                lat: 40.694983,
                lng: -73.949382
            },
            destination: {
                lat: 40.684294,
                lng: -73.915099
            },
            time: new Date(),
            timeTarget: timeTarget_1.TimeTarget.LEAVE_NOW
        };
        stationDistancePairs = [
            {
                station: {
                    id: 3,
                    address: '131 Tompkins Ave',
                    lat: 40.694977,
                    lng: -73.946239,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.8 km',
                        value: 758
                    },
                    duration: {
                        text: '9 mins',
                        value: 566
                    },
                    status: 'OK'
                }
            },
            {
                station: {
                    id: 3,
                    address: '131 Tompkins Ave',
                    lat: 40.694977,
                    lng: -73.946239,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.8 km',
                        value: 758
                    },
                    duration: {
                        text: '9 mins',
                        value: 566
                    },
                    status: 'OK'
                }
            }
        ];
    });
    it('should be be ok', function () {
        var processManager = new processManager_1.ProcessManager(tqr);
        chai_1.expect(processManager).to.be.ok;
    });
    it('direction should be forwards with Leave now', function () {
        var processManager = new processManager_1.ProcessManager(tqr);
        chai_1.expect(processManager.direction).to.equal(processDirection_1.processDirection.FORWARDS);
    });
    it('direction should be forwards with Depart at', function () {
        tqr.timeTarget = timeTarget_1.TimeTarget.DEPART_AT;
        var processManager = new processManager_1.ProcessManager(tqr);
        chai_1.expect(processManager.direction).to.equal(processDirection_1.processDirection.FORWARDS);
    });
    it('direction should be backwards with Arrive by', function () {
        tqr.timeTarget = timeTarget_1.TimeTarget.ARRIVE_BY;
        var processManager = new processManager_1.ProcessManager(tqr);
        chai_1.expect(processManager.direction).to.equal(processDirection_1.processDirection.BACKWARDS);
    });
    it('shift off of the distance pair through getter affects the original not a copy', function () {
        var processManager = new processManager_1.ProcessManager(tqr);
        processManager.walking1StationDistancePairs = stationDistancePairs;
        processManager.processFirst.shift();
        chai_1.expect(processManager.walking1StationDistancePairs.length).to.equal(1);
    });
});
//# sourceMappingURL=processManager.test.js.map