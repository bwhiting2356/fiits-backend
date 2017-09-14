import { expect } from 'chai';

import { ProcessManager } from '../shared/processManager';
import { TripQueryRequest} from "../shared/tripQueryRequest";
import { processDirection } from "../shared/processDirection"
import { TimeTarget } from "../shared/timeTarget";
import { StationDistancePair } from "../shared/stationDistancePair";

describe('test ProcessManager', () => {
    let tqr: TripQueryRequest;
    let stationDistancePairs: StationDistancePair[];
    beforeEach(() => {
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
            timeTarget: TimeTarget.LEAVE_NOW
        };
        stationDistancePairs = [
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
        ]
    });

    it('should be be ok', () => {
        let processManager = new ProcessManager(tqr);
        expect(processManager).to.be.ok
    });

    it('direction should be forwards with Leave now', () => {
        let processManager = new ProcessManager(tqr);
        expect(processManager.direction).to.equal(processDirection.FORWARDS)
    });

    it('direction should be forwards with Depart at', () => {
        tqr.timeTarget = TimeTarget.DEPART_AT;
        let processManager = new ProcessManager(tqr);
        expect(processManager.direction).to.equal(processDirection.FORWARDS)
    });

    it('direction should be backwards with Arrive by', () => {
        tqr.timeTarget = TimeTarget.ARRIVE_BY;
        let processManager = new ProcessManager(tqr);
        expect(processManager.direction).to.equal(processDirection.BACKWARDS);
    });

    it('shift off of the distance pair through getter affects the original not a copy', () => {
        let processManager = new ProcessManager(tqr);
        processManager.walking1StationDistancePairs = stationDistancePairs;
        processManager.processFirst.shift();
        expect(processManager.walking1StationDistancePairs.length).to.equal(1);
    });
});
