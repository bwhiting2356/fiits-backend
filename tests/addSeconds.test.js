"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var addSeconds_1 = require("../shared/timeHelpers/addSeconds");
describe('test addSeconds', function () {
    it('should be ok', function () {
        var date = new Date("2017-09-14T13:09:28+00:00");
        var seconds = 40;
        chai_1.expect(addSeconds_1.addSeconds(date, seconds)).to.be.ok;
    });
    it('should add the right number of seconds', function () {
        var date = new Date("2017-09-14T13:09:28.000Z");
        var seconds = 40;
        chai_1.expect(addSeconds_1.addSeconds(date, seconds)).to.deep.equal(new Date("2017-09-14T13:10:08.000Z"));
    });
});
//# sourceMappingURL=addSeconds.test.js.map