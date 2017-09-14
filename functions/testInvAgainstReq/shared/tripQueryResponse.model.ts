import { Coords } from './coords';

interface Directions {
    placeholder: String;
}

export interface TripQueryResponse {
    startLocation: Coords;
    startTime: Date;

    walkingDirections1: Directions;

    station1Location: Coords;
    station1ReservationStartTime: Date;
    station1ReservationEndTime: Date;
    station1ReservationPrice: number;

    bikeDirections: Directions;
    bikeRentalPrice: number;

    station2Location: Coords;
    station2ReservationStartTime: Date;
    station2ReservationEndTime: Date;
    station2ReservationPrice; number

    walkingDirections2: Directions

    endLocation: Coords
    endTime: Date

    totalPrice: number
}

/*

station 1: 40.694980, -73.952651
station 2: 40.683196, -73.911857

 */
