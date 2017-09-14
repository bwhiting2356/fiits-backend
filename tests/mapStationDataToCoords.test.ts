import { expect } from 'chai';
import { mapStationDataToCoords } from "../functions/mapStationDataToCoords";
import { stationDataList } from '../mock-data/stationData';

describe('test mapStationDataToCoords', () => {
    it('should be ok', () => {
        expect(mapStationDataToCoords(stationDataList)).to.be.ok
    })
});
