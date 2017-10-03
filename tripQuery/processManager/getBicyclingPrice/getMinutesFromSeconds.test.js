"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var getMinutesFromSeconds_1 = require("./getMinutesFromSeconds");
describe('test getMinutesFromSeconds', function () {
    it('should be ok', function () {
        chai_1.expect(getMinutesFromSeconds_1.getMinutesFromSeconds(360)).to.be.ok;
    });
    it('should return the correct number of minutes', function () {
        chai_1.expect(getMinutesFromSeconds_1.getMinutesFromSeconds(360)).to.equal(6);
    });
});
//# sourceMappingURL=getMinutesFromSeconds.test.js.map