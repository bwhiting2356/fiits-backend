import { DistanceMatrixRequest } from "./distanceMatrixRequest";
import * as googleMapsClient from '../../../googleMaps/googleMapsClient';

export const fetchDistanceMatrix = async (distanceMatrixRequest: DistanceMatrixRequest) => {
    return googleMapsClient.distanceMatrix(distanceMatrixRequest).asPromise();
};
