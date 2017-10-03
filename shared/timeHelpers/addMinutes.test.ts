import { expect } from 'chai';
import { addMinutes } from "./addMinutes";


describe('test addMinutes', () => {
    it('should be ok', () => {
        let date = new Date("2017-09-14T13:09:28+00:00")
        expect(addMinutes(date, 10)).to.be.ok
    });

    it('should add the right number of minutes', () => {
        let date = new Date("2017-09-14T13:09:28.000Z");
        expect(addMinutes(date, 10)).to.deep.equal(new Date("2017-09-14T13:19:28.000Z"));
    })
});
