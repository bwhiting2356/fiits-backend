import { processDirection} from "./processDirection"
import { TripQueryRequest } from "./tripQueryRequest";
import { TimeTarget } from "./timeTarget";
import { StationData } from "../functions/stationData/StationData";
import { StationDistancePair } from "./stationDistancePair";
import {getStationDataFromDB} from "../functions/getStationDataFromDB";
import {TripQueryResponse} from "./tripQueryResponse";
import {Coords} from "./coords";


export class ProcessManager {
    direction: String;
    walking1StationDistancePairs: StationDistancePair[];
    walking2StationDistancePairs: StationDistancePair[];
    station1Reservation: any;
    station2Reservation: any;

    // Keeping track of values to add to response

    departureTime: Date;

    walking1Points: Coords[];
    walking1Duration: number;
    walking1DistanceText: string;

    station1: Coords;
    reservation1StartTime: Date;
    reservation1EndTime: Date;
    reservation1Price: number;

    bicyclingPoints: Coords[];
    bicyclingDuration: number;
    bicyclingDistanceText: string;
    bicyclingPrice: number;

    station2: Coords;
    reservation2StartTime: Date;
    reservation2EndTime: Date;
    reservation2Price: number;

    walking2Points: Coords[];
    walking2Duration: number;
    walking2DistanceText: string;

    arrivalTime: Date;


    constructor(private tripQueryRequest: TripQueryRequest) {
        this.direction = tripQueryRequest.timeTarget === TimeTarget.ARRIVE_BY
            ? processDirection.BACKWARDS
            : processDirection.FORWARDS;
        if (this.direction === processDirection.FORWARDS) {
            this.departureTime = tripQueryRequest.time;
        } else if (this.direction === processDirection.BACKWARDS) {
            this.arrivalTime = tripQueryRequest.time;
        }
    }

    get processFirst() {
        if (this.direction === processDirection.FORWARDS) {
            return this.walking1StationDistancePairs;
        } else {
            return this.walking2StationDistancePairs;
        }
    }

    get processSecond() {
        if (this.direction === processDirection.FORWARDS) {
            return this.walking2StationDistancePairs;
        } else {
            return this.walking1StationDistancePairs;
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

    // get tripQueryResponse(): TripQueryResponse {
    //
    //     return {
    //         origin: this.tripQueryRequest.origin,
    //
    //
    //         destination: this.tripQueryRequest.destination
    //     }
    // }



}
//
// export interface TripQueryResponse {
//     origin: Coords;
//     departureTime: Date;
//
//     walking1Points: Coords[];
//     walking1Duration: number;
//     walking1DistanceText: string;
//
//     station1: Coords;
//     reservation1StartTime: Date;
//     reservation1EndTime: Date;
//     reservation1Price: number
//
//     bicyclingPoints: Coords[];
//     bicyclingDuration: number;
//     bicyclingDistanceText: string;
//     bicyclingPrice: number;
//
//     station2: Coords;
//     reservation2StartTime: Date;
//     reservation2EndTime: Date;
//     reservation2Price: Date;
//
//     walking2Points: Coords[];
//     walking2Duration: number;
//     walking2DistanceText: string;
//
//     destination: Coords;
//     arrivalTime: Date;
// }

