"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareBicyclingDistance_1 = require("./compareBicyclingDistance");
describe('test compareBicyclingDistance', function () {
    var a = {
        station: undefined,
        bicyclingDistance: {
            distanceText: "",
            duration: 9
        }
    };
    var b = {
        station: undefined,
        bicyclingDistance: {
            distanceText: "",
            duration: 13
        }
    };
    it('should be ok', function () {
        chai_1.expect(compareBicyclingDistance_1.compareBicyclingDistance(a, b)).to.be.ok;
    });
    it('should return the correct difference of durations', function () {
        chai_1.expect(compareBicyclingDistance_1.compareBicyclingDistance(a, b)).to.equal(-4);
    });
});
//# sourceMappingURL=compareBicyclingDistance.test.js.map