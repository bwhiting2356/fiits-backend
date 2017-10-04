import { expect, assert } from 'chai';
import { findFirstReservation } from "../functions/findFirstReservation";
import { ProcessManager } from "../routes/api/tripQuery/processManager/processManager";
import { TripQueryRequest } from "../shared/tripQueryRequest";
import { TimeTarget } from "../shared/timeTarget";
import {StationDistancePair} from "../shared/stationDistancePair";

describe('test findFirstReservation', () => {
    let processManager: ProcessManager;
    let tripQueryRequest: TripQueryRequest;
    let stationDistancePairList: StationDistancePair[];

    beforeEach(() => {
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
            timeTarget: TimeTarget.LEAVE_NOW
        };
        processManager = new ProcessManager(tripQueryRequest);
        stationDistancePairList = [
            {
                station:
                    {
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
                station:
                    {
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



    it('should be ok', (done) => {
        findFirstReservation(processManager, tripQueryRequest).then((reservation) => {
            expect(reservation).to.be.ok
            done();
        }, (error) => {
            assert.fail(error);
            done();
        })

    })
});
