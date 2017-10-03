"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var subtractSeconds_1 = require("./subtractSeconds");
describe('test subtractSeconds', function () {
    it('should be ok', function () {
        var date = new Date("2017-09-14T13:09:28+00:00");
        var seconds = 40;
        chai_1.expect(subtractSeconds_1.subtractSeconds(date, seconds)).to.be.ok;
    });
    it('should subtract the right number of seconds', function () {
        var date = new Date("2017-09-14T13:09:28.000Z");
        var seconds = 27;
        chai_1.expect(subtractSeconds_1.subtractSeconds(date, seconds)).to.deep.equal(new Date("2017-09-14T13:09:01.000Z"));
    });
});
//# sourceMappingURL=subtractSeconds.test.js.map