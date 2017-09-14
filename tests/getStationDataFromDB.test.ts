import { expect } from 'chai';

import { getStationDataFromDB } from '../functions/getStationDataFromDB';

describe('test getStations', () => {
    it('should be ok', () => {
        expect(getStationDataFromDB()).to.be.ok
    })
});


// TODO: actually test these function with sinon or mocks/stubs or something
