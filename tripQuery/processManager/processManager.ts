import { processDirection} from "./processDirection"
import { TripQueryRequest } from "../../shared/tripQueryRequest";
import { TimeTarget } from "../../shared/timeTarget";

import { StationDistancePair } from "../../shared/stationDistancePair";
import { TripData } from "../../shared/tripData";
import { StationDistanceData } from "../stationData/stationDistanceData";
import { compareWalking1Distance } from "../stationData/compare/compareWalking1Distance";
import { compareWalking2Distance } from "../stationData/compare/compareWalking2Distance";
import { compareBicyclingDistance } from "../stationData/compare/compareBicyclingDistance";
import { stationToCoords } from "../stationData/stationToCoords";
import { Coords } from "../../shared/coords";
import { addSeconds } from "../../shared/timeHelpers/addSeconds";
import { subtractSeconds } from "../../shared/timeHelpers/subtractSeconds";
import { getBicyclingPrice } from "./getBicyclingPrice/getBicyclingPrice";
import {StationData} from "../stationData/stationData";

export class ProcessManager {
    stationDistanceData: StationDistanceData[];
    direction: string;
    tripData: TripData;

    constructor(private tripQueryRequest: TripQueryRequest, public tripId: number) {
        this.tripData = {};
        this.tripData.originAddress = tripQueryRequest.originAddress;
        this.tripData.originCoords = tripQueryRequest.originCoords;
        this.tripData.destinationAddress = tripQueryRequest.destinationAddress;
        this.tripData.destinationCoords = tripQueryRequest.destinationCoords;

        this.direction = tripQueryRequest.timeTarget === TimeTarget.ARRIVE_BY
            ? processDirection.BACKWARDS
            : processDirection.FORWARDS;
        if (this.direction === processDirection.FORWARDS) {
            this.tripData.departureTime = tripQueryRequest.time;
        } else if (this.direction === processDirection.BACKWARDS) {
            this.tripData.arrivalTime = tripQueryRequest.time;
        }
    }

    addStationData(stationData: StationData[]) {
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
            return this.stationsWalking1Distances;
        } else if (stationNumber === 2 ) {
            return this.stationsWalking2Distances;
        }
    };

    addReservResponseData(n: number, stationSuccess: StationDistanceData, reservSuccess) {
        if (n === 1) {
            this.tripData.station1Coords = stationToCoords(stationSuccess.station);
            this.tripData.station1Address = stationSuccess.station.address;
            this.tripData.walking1Distance = stationSuccess.walking1Distance;
            this.tripData.reservation1Time = reservSuccess.time;
            this.tripData.reservation1Price = reservSuccess.price;
            if (this.direction === processDirection.BACKWARDS) {
                this.tripData.bicyclingDistance = stationSuccess.bicyclingDistance;
                this.tripData.bicyclingPrice = getBicyclingPrice(stationSuccess.bicyclingDistance.duration);
                this.tripData.arrivalTime = subtractSeconds(reservSuccess.time, stationSuccess.walking1Distance.duration);
            }

        } else if (n === 2) {
            this.tripData.station2Coords = stationToCoords(stationSuccess.station);
            this.tripData.station2Address = stationSuccess.station.address;
            this.tripData.walking2Distance = stationSuccess.walking2Distance;
            this.tripData.reservation2Time = reservSuccess.time;
            this.tripData.reservation2Price = reservSuccess.price;
            if (this.direction === processDirection.FORWARDS) {
                this.tripData.bicyclingDistance = stationSuccess.bicyclingDistance;
                this.tripData.bicyclingPrice = getBicyclingPrice(stationSuccess.bicyclingDistance.duration);
                this.tripData.arrivalTime = addSeconds(reservSuccess.time, stationSuccess.walking2Distance.duration);
            }
        }
    }

    addWalking1Directions(res) {
        const leg = res.json.routes[0].legs[0];
        this.tripData.originAddress = leg.start_address;
        this.tripData.originCoords = leg.start_location;
        const steps = leg.steps;
        this.tripData.walking1Points = convertStepsToCoords(steps);
    }

    addWalking2Directions(res) {
        const leg = res.json.routes[0].legs[0];
        this.tripData.destinationAddress = leg.end_address;
        this.tripData.destinationCoords = leg.end_location;
        const steps = leg.steps;
        this.tripData.walking2Points = convertStepsToCoords(steps);
    }

    addBicyclingDirections(res) {
        const leg = res.json.routes[0].legs[0];
        const steps = leg.steps;
        this.tripData.bicyclingPoints = convertStepsToCoords(steps);
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
            ? this.tripData.station1Coords
            : this.tripData.station2Coords;
    }
}

const convertStepsToCoords = (steps): Coords[] => {
    let allCoords = new Set<Coords>();
    steps.forEach(step => {
        allCoords.add(step.start_location);
        allCoords.add(step.end_location);
    });
    return Array.from(allCoords);
};

