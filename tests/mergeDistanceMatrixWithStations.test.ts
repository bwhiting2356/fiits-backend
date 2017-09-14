import { expect } from 'chai';

import { mergeDistanceMatrixWithStations } from "../functions/mergeDistanceMatrixWithStations";
import { stationDataList } from '../mock-data/stationData';
import { distanceMatrixResults } from '../mock-data/distanceMatrixResults'

describe('test mergeDistanceMatrixWithStations', () => {
    it('should be ok', () => {
        expect(mergeDistanceMatrixWithStations(stationDataList, distanceMatrixResults)).to.be.ok
    });

    it('should correctly merge the data', () => {
        expect(mergeDistanceMatrixWithStations(stationDataList, distanceMatrixResults)).to.deep.equal([
            {
                station: {
                    id: 1,
                    address: "754 Myrtle Ave",
                    lat: 40.695109,
                    lng: -73.952962,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.8 km',
                        value: 758
                    },
                    duration: {
                        text: '9 mins',
                        value: 566
                    },
                    status: 'OK'
                }
            },
            {
                station: {
                    id: 2,
                    address: "185-211 Throop Ave",
                    lat: 40.697979,
                    lng: -73.943836,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.8 km',
                        value: 834
                    },
                    duration: {
                        text: '11 mins',
                        value: 636
                    },
                    status: 'OK' },
            },
            {
                station: {
                    id: 3,
                    address: "131 Tompkins Ave",
                    lat: 40.694977,
                    lng: -73.946239,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.5 km',
                        value: 510 },
                    duration: {
                        text: '6 mins',
                        value: 369
                    },
                    status: 'OK'
                },

            },
            {
                station: {
                    id: 4,
                    address: "1567 Broadway",
                    lat: 40.685767,
                    lng: -73.915527,
                    currentInv: 5,
                    capacity: 10
                },
                distance: {
                    distance: {
                        text: '0.8 km',
                        value: 750
                    },
                    duration: {
                        text: '10 mins',
                        value: 572
                    },
                    status: 'OK'
                }
            }
        ])
    });
});
