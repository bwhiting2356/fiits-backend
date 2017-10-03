import { expect } from 'chai';

import {multiplyIncrementsByPrice} from "./multiplyIncrementsByPrice";

describe('test multiplyIncrementsByPrice', () => {
    it('should be ok', () => {
        expect(multiplyIncrementsByPrice(4, -0.10)).to.be.ok
    });

    it('should return the correct price', () => {
        expect(multiplyIncrementsByPrice(4, -0.10)).to.equal(-0.40)
    })
});
