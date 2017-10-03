import { expect } from 'chai';
import { subtractSeconds } from "./subtractSeconds";


describe('test subtractSeconds', () => {
    it('should be ok', () => {
        let date = new Date("2017-09-14T13:09:28+00:00")
        let seconds = 40;
        expect(subtractSeconds(date, seconds)).to.be.ok
    });

    it('should subtract the right number of seconds', () => {
        let date = new Date("2017-09-14T13:09:28.000Z");
        let seconds = 27;
        expect(subtractSeconds(date, seconds)).to.deep.equal(new Date("2017-09-14T13:09:01.000Z"));
    })
});
