import { expect } from 'chai';
import { compareBicyclingDistance } from "./compareBicyclingDistance";

describe('test compareBicyclingDistance', () => {
    const a = {
        station: undefined,
        bicyclingDistance: {
            distanceText: "",
            duration: 9
        }
    };

    const b = {
        station: undefined,
        bicyclingDistance: {
            distanceText: "",
            duration: 13
        }
    };

    it('should be ok', () => {
        expect(compareBicyclingDistance(a, b)).to.be.ok
    });

    it('should return the correct difference of durations', () => {
        expect(compareBicyclingDistance(a, b)).to.equal(-4);
    })
});
