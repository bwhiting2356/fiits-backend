import { expect } from 'chai';
import { getIncrements } from "./getIncrements";

describe('test getIncrements', () => {
    it('should be ok', () => {
        expect(getIncrements(50, 10)).to.be.ok
    });

    it('should return the correct number of increments', () => {
        expect(getIncrements(48, 10)).to.equal(5)
    })
});
