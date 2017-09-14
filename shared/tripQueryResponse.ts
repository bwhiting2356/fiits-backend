import { TripQueryRequest } from "./tripQueryRequest";

export interface TripQueryResponse {
    tripQueryRequest: TripQueryRequest;
    reservation1: any;
    station1: any;
    reservation2: any;
    station2: any;
    leave: Date;
    arrive: Date;
    walkingDirections1: any;
    bicyclingDirections: any;
    walkingDirections2: any;
}
