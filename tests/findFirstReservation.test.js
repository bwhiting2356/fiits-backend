"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var findFirstReservation_1 = require("../functions/findFirstReservation");
var processManager_1 = require("../routes/api/tripQuery/processManager/processManager");
var timeTarget_1 = require("../shared/timeTarget");
describe('test findFirstReservation', function () {
    var processManager;
    var tripQueryRequest;
    var stationDistancePairList;
    beforeEach(function () {
        tripQueryRequest = {
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
        processManager = new processManager_1.ProcessManager(tripQueryRequest);
        stationDistancePairList = [
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
        processManager.walking1StationDistancePairs = stationDistancePairList;
        processManager.walking2StationDistancePairs = stationDistancePairList;
    });
    it('should be ok', function (done) {
        findFirstReservation_1.findFirstReservation(processManager, tripQueryRequest).then(function (reservation) {
            chai_1.expect(reservation).to.be.ok;
            done();
        }, function (error) {
            chai_1.assert.fail(error);
            done();
        });
    });
});
//# sourceMappingURL=findFirstReservation.test.js.map