"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var compareWalking1Distance_1 = require("./compareWalking1Distance");
describe('test compareWalking1Distance', function () {
    var a = {
        station: undefined,
        walking1Distance: {
            distanceText: "",
            duration: 9
        }
    };
    var b = {
        station: undefined,
        walking1Distance: {
            distanceText: "",
            duration: 13
        }
    };
    it('should be ok', function () {
        chai_1.expect(compareWalking1Distance_1.compareWalking1Distance(a, b)).to.be.ok;
    });
    it('should return the correct difference of durations', function () {
        chai_1.expect(compareWalking1Distance_1.compareWalking1Distance(a, b)).to.equal(-4);
    });
});
//# sourceMappingURL=compareWalking1Distance.test.js.map