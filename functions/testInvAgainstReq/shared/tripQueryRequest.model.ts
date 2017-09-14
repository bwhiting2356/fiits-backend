import { Coords } from './coords';

export interface TripQueryRequest {
    searchOriginCoords: Coords;
    searchDestinationCoords: Coords;
    searchDatetime: Date;
    searchTimeTarget: String
}
