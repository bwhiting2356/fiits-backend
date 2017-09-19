import { processDirection} from "./processDirection"
import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { TimeTarget } from "../../shared/timeTarget";
import { StationData } from "../../functions/stationData/StationData";
import { StationDistancePair } from "../../shared/stationDistancePair";
import { TripQueryResponse } from "../../shared/tripQueryResponse";
import { StationDistanceData } from "../stationData/stationDistanceData";
import { compareWalking1Distance } from "../stationData/compareWalking1Distance";
import { compareWalking2Distance } from "../stationData/compareWalking2Distance";
import { compareBicyclingDistance } from "../stationData/compareBicyclingDistance";
import { stationToCoords } from "../stationData/stationToCoords";
import { Coords } from "../../shared/coords";

export class ProcessManager {
    stationDistanceData: StationDistanceData[];
    direction: string;
    tripQueryResponse: TripQueryResponse;

    constructor(private tripQueryRequest: TripQueryRequest) {
        this.tripQueryResponse = {};
        this.tripQueryResponse.originAddress = tripQueryRequest.origin;
        this.tripQueryResponse.destinationAddress = tripQueryRequest.destination;

        this.direction = tripQueryRequest.timeTarget === TimeTarget.ARRIVE_BY
            ? processDirection.BACKWARDS
            : processDirection.FORWARDS;
        if (this.direction === processDirection.FORWARDS) {
            this.tripQueryResponse.departureTime = tripQueryRequest.time;
        } else if (this.direction === processDirection.BACKWARDS) {
            this.tripQueryResponse.arrivalTime = tripQueryRequest.time;
        }
    }

    addStationData(stationData: StationData[]) {
        this.stationDistanceData = stationData.map(station => ({
            station
        }))
    }

    addWalking1Distances(walking1Results) {
        console.log(walking1Results);
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
            this.stationDistanceData[i].bicyclingDistance = {
                distanceText:  distances[i].distance.text,
                duration: distances[i].duration.value
            };
        }
    }

    get stationsWalking1Distances(): StationDistanceData[] {
        return this.stationDistanceData.sort(compareWalking1Distance);
    }

    get stationsWalking2Distances(): StationDistanceData[] {
        return this.stationDistanceData.sort(compareWalking2Distance);
    }

    get stationsBicyclingDistances(): StationDistanceData[] {
        return this.stationDistanceData.sort(compareBicyclingDistance);
    }

    getStationDistanceData(
        stationNumber: number,
    ): StationDistanceData[] {
        if (stationNumber === 1) {
            if (this.direction === processDirection.FORWARDS) {
                return this.stationsWalking1Distances;
            } else if (this.direction === processDirection.BACKWARDS) {
                return this.stationsBicyclingDistances;
            }
        } else if (stationNumber === 2 ) {
            if (this.direction === processDirection.FORWARDS) {
                return this.stationsBicyclingDistances;
            } else if (this.direction === processDirection.BACKWARDS) {
                return this.stationsWalking2Distances;
            }
        }
    };

    addResponseData(n: number, stationSuccess, reservSuccess) {
        if (n === 1) {
            this.tripQueryResponse.station1Coords = stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station1Address = stationSuccess.station.address;
            this.tripQueryResponse.walking1Distance = stationSuccess.walking1Distance;
            this.tripQueryResponse.reservation1Time = reservSuccess.time;
        } else if (n === 2) {
            this.tripQueryResponse.station2Coords = stationToCoords(stationSuccess.station);
            this.tripQueryResponse.station2Address = stationSuccess.station.address;
            this.tripQueryResponse.walking2Distance = stationSuccess.walking2Distance;
            this.tripQueryResponse.reservation2Time = reservSuccess.time;
        }
        if (n === 2 && this.direction === processDirection.FORWARDS ||
            n === 1 && this.direction === processDirection.BACKWARDS) {
            this.tripQueryResponse.bicyclingDistance = stationSuccess.bicyclingDistance;
        }
    }

    getStationArrivalTime(time: Date, stationDistancePair: StationDistancePair): Date {
        let newDate: Date;
        if (this.direction === processDirection.FORWARDS) {
            newDate.setSeconds(time.getSeconds() + stationDistancePair.distance.duration.value);
        } else {
            newDate.setSeconds(time.getSeconds() - stationDistancePair.distance.duration.value);
        }
        return newDate
    }

    get firstStation() {
        return this.direction === processDirection.FORWARDS ? 1 : 2;
    }

    get secondStation() {
        return this.direction === processDirection.FORWARDS ? 2 : 1;
    }

    get bicyclingOriginStation(): Coords {
        return this.direction === processDirection.FORWARDS
            ? this.tripQueryResponse.station1Coords
            : this.tripQueryResponse.station2Coords;
    }
}

