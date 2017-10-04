import { DistanceMatrixRequest } from "../routes/api/distanceMatrix/distanceMatrixRequest";
import * as googleMapsClient from '../googleMaps/googleMapsClient';

export const fetchDistanceMatrix = (distanceMatrixRequest: DistanceMatrixRequest) => {
    return googleMapsClient.distanceMatrix(distanceMatrixRequest).asPromise();
};
