"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareWalking2Distance_1 = require("./compareWalking2Distance");
describe('test compareWalking2Distance', function () {
    var a = {
        station: undefined,
        walking2Distance: {
            distanceText: "",
            duration: 9
        }
    };
    var b = {
        station: undefined,
        walking2Distance: {
            distanceText: "",
            duration: 13
        }
    };
    it('should be ok', function () {
        chai_1.expect(compareWalking2Distance_1.compareWalking2Distance(a, b)).to.be.ok;
    });
    it('should return the correct difference of durations', function () {
        chai_1.expect(compareWalking2Distance_1.compareWalking2Distance(a, b)).to.equal(-4);
    });
});
//# sourceMappingURL=compareWalking2Distance.test.js.map