"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var addMinutes_1 = require("../shared/timeHelpers/addMinutes");
describe('test addTenMinutes', function () {
    it('should be ok', function () {
        var date = new Date("2017-09-14T13:09:28+00:00");
        chai_1.expect(addMinutes_1.addMinutes(date, 10)).to.be.ok;
    });
    it('new Date should be 10 minutes later', function () {
        var date = new Date("2017-09-14T13:09:28.000Z");
        chai_1.expect(addMinutes_1.addMinutes(date, 10)).to.deep.equal(new Date("2017-09-14T13:19:28.000Z"));
    });
});
//# sourceMappingURL=addTenMinutes.test.js.map