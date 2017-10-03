import { expect } from 'chai';
import { getBicyclingPrice } from "./getBicyclingPrice";


describe('test getBicyclingPrice', () => {
    it('should be ok', () => {
        expect(getBicyclingPrice(360)).to.be.ok
    });

    it('should return the correct total price', () => {
        expect(getBicyclingPrice(1000)).to.equal(-0.20);
    });

    // TODO: figure out how to test this better with its dependenciess
});
