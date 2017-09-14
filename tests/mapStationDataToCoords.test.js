"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var mapStationDataToCoords_1 = require("../functions/mapStationDataToCoords");
var stationData_1 = require("../mock-data/stationData");
describe('test mapStationDataToCoords', function () {
    it('should be ok', function () {
        chai_1.expect(mapStationDataToCoords_1.mapStationDataToCoords(stationData_1.stationDataList)).to.be.ok;
    });
});
//# sourceMappingURL=mapStationDataToCoords.test.js.map