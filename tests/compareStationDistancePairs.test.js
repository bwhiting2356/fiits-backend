"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareWalking1Distance_1 = require("../functions/stationData/compareWalking1Distance");
describe('test compareStationDistancePairs', function () {
    var a = {
        station: {
            id: 1,
            address: "754 Myrtle Ave",
            lat: 40.695109,
            lng: -73.952962,
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
    };
    var b = {
        station: {
            id: 2,
            address: "185-211 Throop Ave",
            lat: 40.697979,
            lng: -73.943836,
            currentInv: 5,
            capacity: 10
        },
        distance: {
            distance: {
                text: '0.8 km',
                value: 834
            },
            duration: {
                text: '11 mins',
                value: 636
            },
            status: 'OK'
        },
    };
    it('should return the right number', function () {
        chai_1.expect(compareWalking1Distance_1.compareStationDistancePairs(a, b)).to.equal(-70);
    });
});
//# sourceMappingURL=compareStationDistancePairs.test.js.map