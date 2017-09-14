
import * as googleMapsClient from '../googleMaps/googleMapsClient';
import {Coords} from "../shared/coords";
import {StationData} from "./stationData/StationData";

export const fetchDirections = (
    origin: Coords | StationData,
    destination: Coords | StationData,
    mode: string) => {

    let request = {
        origin: {
            lat: origin.lat,
            lng: origin.lng
        },
        destination: {
            lat: destination.lat,
            lng: destination.lng
        },
        mode: mode
    };

    return googleMapsClient.directions(request).asPromise();
};
