"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var fetchDistanceMatrix_1 = require("../functions/fetchDistanceMatrix");
describe('test fetchDistanceMatrix', function () {
    var distanceMatrixRequest = {
        origins: [],
        destinations: [],
        mode: 'walking'
    };
    it('should be ok', function () {
        chai_1.expect(fetchDistanceMatrix_1.fetchDistanceMatrix(distanceMatrixRequest)).to.be.ok;
    });
    // TODO: use sinon or a stub to pretend to test this
});
//# sourceMappingURL=fetchDistanceMatrix.test.js.map