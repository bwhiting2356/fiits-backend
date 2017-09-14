"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var getStationDataFromDB_1 = require("../functions/getStationDataFromDB");
describe('test getStations', function () {
    it('should be ok', function () {
        chai_1.expect(getStationDataFromDB_1.getStationDataFromDB()).to.be.ok;
    });
});
// TODO: actually test these function with sinon or mocks/stubs or something
//# sourceMappingURL=getStationDataFromDB.test.js.map