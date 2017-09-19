import { expect } from 'chai';
import { addSeconds } from "../shared/timeHelpers/addSeconds";

describe('test addSeconds', () => {
    it('should be ok', () => {
        let date = new Date("2017-09-14T13:09:28+00:00")
        let seconds = 40;
        expect(addSeconds(date, seconds)).to.be.ok
    })

    it('should add the right number of seconds', () => {
        let date = new Date("2017-09-14T13:09:28.000Z");
        let seconds = 40;
        expect(addSeconds(date, seconds)).to.deep.equal(new Date("2017-09-14T13:10:08.000Z"));
    })
});
