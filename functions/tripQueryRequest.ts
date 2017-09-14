import { TripQueryRequest } from "../shared/tripQueryRequest";
import { ProcessManager } from "../shared/processManager";

import { getStationDataFromDB } from "./getStationDataFromDB";
import { fetchDistanceMatrix } from "./fetchDistanceMatrix";
import { processDirection } from "../shared/processDirection";
import { getDataValuesFromStations } from "./getDataValuesFromStations";
import { findFirstReservation } from "./findFirstReservation";
import { TravelMode } from "../shared/travelMode";
import { StationDataManager } from "./stationData/stationDataManager";
import { buildDistanceMatrixRequest } from "./buildDistanceMatrixRequest";
import { findSecondReservation } from "./findSecondReservation";
import { TripQueryResponse } from "../shared/tripQueryResponse";
import { ReservationResponse } from "./reservationResponse";
import { addSeconds } from "./addSeconds";
import { fetchDirections } from "./fetchDirections";

export const tripQueryRequest = async (tripQueryRequest: TripQueryRequest) => {

    let processManager = new ProcessManager(tripQueryRequest);
    let stationDataManager = new StationDataManager();
    const stationData = await getStationDataFromDB().then(data => getDataValuesFromStations(data));
    stationDataManager.initializeStations(stationData);

    if (processManager.direction === processDirection.FORWARDS) {

        let tripQueryResponse: TripQueryResponse = {
            tripQueryRequest: tripQueryRequest,
            reservation1: undefined,
            station1: undefined,
            reservation2: undefined,
            station2: undefined,
            leave: tripQueryRequest.time,
            arrive: undefined,
            walkingDirections1: undefined,
            bicyclingDirections: undefined,
            walkingDirections2: undefined
        };

        const walkingRequest1 = buildDistanceMatrixRequest(
            tripQueryRequest.origin,
            stationDataManager,
            TravelMode.walking
        );

        const walkingRequest1Promise = fetchDistanceMatrix(walkingRequest1)
            .then(distanceMatrixResults => {
                stationDataManager.addWalking1Distances(distanceMatrixResults);
            });

        const walkingRequest2 = buildDistanceMatrixRequest(
            tripQueryRequest.destination,
            stationDataManager,
            TravelMode.walking
        );

        const walkingRequest2Promise = fetchDistanceMatrix(walkingRequest2)
            .then(distanceMatrixResults => {
                stationDataManager.addWalking2Distances(distanceMatrixResults)
            });

        let walkingDirections1;
        const reservation1Success = walkingRequest1Promise
            .then((h) => {
                return findFirstReservation(
                    stationDataManager.stationsWalking1Distances,
                    tripQueryRequest
                );
            })
            .then((reservation1) => {
                fetchDirections(
                    tripQueryRequest.origin,
                    reservation1.station.station,
                    TravelMode.walking)
                    .then(walkingDirectionsReponse => {
                        tripQueryResponse.walkingDirections1 = walkingDirectionsReponse;
                    });
                return reservation1
            });


        const all = Promise.all([walkingRequest2Promise, reservation1Success]).then(results => {
            tripQueryResponse.reservation1 = results[1].reservation;
            tripQueryResponse.station1 = results[1].station;

            const bicyclingRequest = buildDistanceMatrixRequest(
                results[1].station.station,
                stationDataManager,
                TravelMode.bicycling
            );

            return fetchDistanceMatrix(bicyclingRequest).then(distanceMatrixResults => {
                    stationDataManager.addBicyclingDistances(distanceMatrixResults)
                })
                .then(() => {
                    return findSecondReservation(
                        stationDataManager.stationsWalking2Distances,
                        results[1].reservation
                    );
                })
                .then((reservation2: ReservationResponse) => {
                    tripQueryResponse.reservation2 = reservation2.reservation;
                    tripQueryResponse.station2 = reservation2.station;
                    tripQueryResponse.arrive = addSeconds(
                        reservation2.reservation.time,
                        reservation2.station.walking2Distance.duration
                    );

                    return fetchDirections(
                        tripQueryRequest.destination,
                        reservation2.station.station,
                        TravelMode.walking)
                        .then(walkingDirectionsReponse => {
                            return tripQueryResponse.walkingDirections2 = walkingDirectionsReponse;
                        });
                })
                .then(() => {
                    return fetchDirections(
                        tripQueryResponse.station1.station,
                        tripQueryResponse.station2.station,
                        TravelMode.bicycling)
                        .then(directionsResponse => {
                            tripQueryResponse.bicyclingDirections = directionsResponse;
                            console.log(tripQueryResponse);
                            return tripQueryResponse;
                        });
                }).then(tripQueryResponse => tripQueryResponse);
        });
        return await all;

    } else if (processManager.direction === processDirection.BACKWARDS) {

    }
};

let tqr: TripQueryRequest = {
    origin: {
        lat: 40.694983,
        lng: -73.949382
    },
    destination: {
        lat: 40.684294,
        lng: -73.915099
    },
    time: new Date(),
    timeTarget: 'Leave now'
};

tripQueryRequest(tqr).then((result) => console.log("\n\n\n I'm finally at the end", result));
