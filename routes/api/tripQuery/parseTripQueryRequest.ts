import { TripQueryRequest } from "../../../shared/tripQueryRequest";

export const parseTripQueryRequest = (req): TripQueryRequest => {
    return {...req.body, time: new Date(req.body.time)}
};
