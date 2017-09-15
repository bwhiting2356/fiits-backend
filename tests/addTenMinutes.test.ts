import { expect } from 'chai';
import { addTenMinutes } from "../functions/addTenMinutes";

describe('test addTenMinutes', () => {
    it('should be ok', () => {
        let date = new Date("2017-09-14T13:09:28+00:00")
        expect(addTenMinutes(date)).to.be.ok
    });

    it('new Date should be 10 minutes later', () => {
        let date = new Date("2017-09-14T13:09:28.000Z");
        expect(addTenMinutes(date)).to.deep.equal(new Date("2017-09-14T13:19:28.000Z"));
    })
});
