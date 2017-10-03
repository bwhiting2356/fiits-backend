import { expect } from 'chai';
import { compareWalking1Distance } from "./compareWalking1Distance";

describe('test compareWalking1Distance', () => {
    const a = {
        station: undefined,
        walking1Distance: {
            distanceText: "",
            duration: 9
        }
    };

    const b = {
        station: undefined,
        walking1Distance: {
            distanceText: "",
            duration: 13
        }
    };

    it('should be ok', () => {
        expect(compareWalking1Distance(a, b)).to.be.ok
    });

    it('should return the correct difference of durations', () => {
        expect(compareWalking1Distance(a, b)).to.equal(-4);
    })
});
