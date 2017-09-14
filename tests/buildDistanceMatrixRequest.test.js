"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var buildDistanceMatrixWalkingReq_1 = require("../functions/buildDistanceMatrixWalkingReq");
describe('test buildDistanceMatrixRequest', function () {
    var stationDataList = [
        { lat: 40.695109, lng: -73.952962 },
        { lat: 40.697979, lng: -73.943836 },
        { lat: 40.694977, lng: -73.946239 }
    ];
    var origin = {
        lat: 40.694983,
        lng: -73.949382
    };
    it('should be ok', function () {
        chai_1.expect(buildDistanceMatrixWalkingReq_1.buildDistanceMatrixRequest(stationDataList, origin)).to.be.ok;
    });
    it('should have the right contents', function () {
        chai_1.expect(buildDistanceMatrixWalkingReq_1.buildDistanceMatrixRequest(stationDataList, origin)).to.deep.equal({
            origins: [origin],
            destinations: stationDataList,
            mode: 'walking'
        });
    });
});
//# sourceMappingURL=buildDistanceMatrixRequest.test.js.map