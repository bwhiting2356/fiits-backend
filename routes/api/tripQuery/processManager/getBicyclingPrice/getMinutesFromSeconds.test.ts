import { expect } from 'chai';
import { getMinutesFromSeconds } from "./getMinutesFromSeconds";


describe('test getMinutesFromSeconds', () => {
    it('should be ok', () => {
        expect(getMinutesFromSeconds(360)).to.be.ok
    });

    it('should return the correct number of minutes', () => {
        expect(getMinutesFromSeconds(360)).to.equal(6);
    })
});
