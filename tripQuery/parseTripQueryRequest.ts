import { TripQueryRequest } from "../shared/tripQueryRequest";

export const parseTripQueryRequest = (req): TripQueryRequest => {
    return {...req.body.payload, time: new Date(req.body.payload.time)}
};
