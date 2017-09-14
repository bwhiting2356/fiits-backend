import { processDirection} from "./processDirection"
import { TripQueryRequest } from "./tripQueryRequest";
import { TimeTarget } from "./timeTarget";
import { StationData } from "../functions/stationData/StationData";
import { StationDistancePair } from "./stationDistancePair";
import {getStationDataFromDB} from "../functions/getStationDataFromDB";


export class ProcessManager {
    direction: String;
    stationDataList: StationData[];
    walking1StationDistancePairs: StationDistancePair[];
    walking2StationDistancePairs: StationDistancePair[];
    station1Reservation: any;
    station2Reservation: any;


    stationDataPromise: Promise<StationData[]>;
    getStationData() {
        this.stationDataPromise = getStationDataFromDB();
    }
    getStation1() {
        this.stationDataPromise.then()
    }
    getWalkingDirections1() {

    }
    getStation2() {

    }
    getWalkingDirections2() {

    }
    getBikeDirections() {

    }
    sendResponse() {
        // Promise.all(promises)
    }






    constructor(tripQueryRequest: TripQueryRequest) {
        this.direction = tripQueryRequest.timeTarget === TimeTarget.ARRIVE_BY
            ? processDirection.BACKWARDS
            : processDirection.FORWARDS;
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










}
