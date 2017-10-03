"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var getIncrements_1 = require("./getIncrements");
describe('test getIncrements', function () {
    it('should be ok', function () {
        chai_1.expect(getIncrements_1.getIncrements(50, 10)).to.be.ok;
    });
    it('should return the correct number of increments', function () {
        chai_1.expect(getIncrements_1.getIncrements(48, 10)).to.equal(5);
    });
});
//# sourceMappingURL=getIncrements.test.js.map