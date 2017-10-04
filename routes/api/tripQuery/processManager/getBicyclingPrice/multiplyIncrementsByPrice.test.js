"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var multiplyIncrementsByPrice_1 = require("./multiplyIncrementsByPrice");
describe('test multiplyIncrementsByPrice', function () {
    it('should be ok', function () {
        chai_1.expect(multiplyIncrementsByPrice_1.multiplyIncrementsByPrice(4, -0.10)).to.be.ok;
    });
    it('should return the correct price', function () {
        chai_1.expect(multiplyIncrementsByPrice_1.multiplyIncrementsByPrice(4, -0.10)).to.equal(-0.40);
    });
});
//# sourceMappingURL=multiplyIncrementsByPrice.test.js.map