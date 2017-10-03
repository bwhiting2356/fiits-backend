import { expect } from 'chai';
import { compareWalking2Distance } from "./compareWalking2Distance";

describe('test compareWalking2Distance', () => {
    const a = {
        station: undefined,
        walking2Distance: {
            distanceText: "",
            duration: 9
        }
    };

    const b = {
        station: undefined,
        walking2Distance: {
            distanceText: "",
            duration: 13
        }
    };

    it('should be ok', () => {
        expect(compareWalking2Distance(a, b)).to.be.ok
    });

    it('should return the correct difference of durations', () => {
        expect(compareWalking2Distance(a, b)).to.equal(-4);
    })
});
