import {StationData} from "./StationData";
import {StationDistanceData} from "./stationDistanceData";
import {compareWalking1Distance} from "./compareWalking1Distance";
import {compareWalking2Distance} from "./compareWalking2Distance";
import {compareBicyclingDistance} from "./compareBicyclingDistance";

export class StationDataManager {
    stationDistanceData: StationDistanceData[];

    constructor() {}

    initializeStations(stationData) {
        this.stationDistanceData = stationData.map(station => ({
            station
        }))
    }

    addWalking1Distances(walking1Results) {
        const distances = walking1Results.json.rows[0].elements;
        for (let i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].walking1Distance = {
                distanceText:  distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    }

    addWalking2Distances(walking2Results) {
        const distances = walking2Results.json.rows[0].elements;
        for (let i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].walking2Distance = {
                distanceText: distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    }

    addBicyclingDistances(bicyclingResults) {
        const distances = bicyclingResults.json.rows[0].elements;
        for (let i = 0; i < this.stationDistanceData.length; i++) {
            this.stationDistanceData[i].byciclingDistance = {
                distanceText:  distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    }

    get stationsWalking1Distances() {
        return this.stationDistanceData.sort(compareWalking1Distance);
    }

    get stationsWalking2Distances() {
        return this.stationDistanceData.sort(compareWalking2Distance);
    }

    get stationsBicyclingDistances() {
        return this.stationDistanceData.sort(compareBicyclingDistance);
    }
}
