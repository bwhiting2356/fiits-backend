import { expect } from 'chai';
import { fetchDistanceMatrix } from "../functions/fetchDistanceMatrix";
import { DistanceMatrixRequest } from "../shared/distanceMatrixRequest";

describe('test fetchDistanceMatrix', () => {
    let distanceMatrixRequest: DistanceMatrixRequest = {
        origins: [],
        destinations: [],
        mode: 'walking'
    };
    it('should be ok', () => {
        expect(fetchDistanceMatrix(distanceMatrixRequest)).to.be.ok
    })

    // TODO: use sinon or a stub to pretend to test this
});
