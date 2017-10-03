"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var getBicyclingPrice_1 = require("./getBicyclingPrice");
describe('test getBicyclingPrice', function () {
    it('should be ok', function () {
        chai_1.expect(getBicyclingPrice_1.getBicyclingPrice(360)).to.be.ok;
    });
    it('should return the correct total price', function () {
        chai_1.expect(getBicyclingPrice_1.getBicyclingPrice(1000)).to.equal(-0.20);
    });
    // TODO: figure out how to test this better with its dependenciess
});
//# sourceMappingURL=getBicyclingPrice.test.js.map