import { expect } from 'chai';
import { buildDistanceMatrixRequest } from "../functions/buildDistanceMatrixWalkingReq";

describe('test buildDistanceMatrixRequest', () => {
    let stationDataList = [
        { lat: 40.695109, lng: -73.952962 },
        { lat: 40.697979, lng: -73.943836 },
        { lat: 40.694977, lng: -73.946239 }
    ];

    let origin = {
        lat: 40.694983,
        lng: -73.949382
    };

    it('should be ok', () => {
        expect(buildDistanceMatrixRequest(stationDataList, origin)).to.be.ok
    });

    it('should have the right contents', () => {
        expect(buildDistanceMatrixRequest(stationDataList, origin)).to.deep.equal({
            origins: [origin],
            destinations: stationDataList,
            mode: 'walking'
        })
    })
});
