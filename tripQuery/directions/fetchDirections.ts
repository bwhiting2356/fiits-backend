import * as googleMapsClient from '../../googleMaps/googleMapsClient';

export const fetchDirections = async (directionsRequest) => {
    return googleMapsClient.directions(directionsRequest).asPromise();
};
