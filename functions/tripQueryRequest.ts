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
import {getPointsFromDirections} from "./getPointsFromDirections";
import {addTenMinutes} from "./addTenMinutes";

export const tripQueryRequest = async (tripQueryRequest: TripQueryRequest) => {

    let processManager = new ProcessManager(tripQueryRequest);
    let stationDataManager = new StationDataManager();
    const stationData = await getStationDataFromDB().then(data => getDataValuesFromStations(data));
    stationDataManager.initializeStations(stationData);

    if (processManager.direction === processDirection.FORWARDS) {

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

        const reservation1Success = walkingRequest1Promise
            .then((reservationResponse: ReservationResponse) => {
            processManager.walking1Duration = reservationResponse.station.walking1Distance.duration;
            processManager.walking1DistanceText = reservationResponse.station.walking1Distance.distanceText;

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
                        processManager.walking1Points = getPointsFromDirections(walkingDirectionsReponse);
                    });
                return reservation1
            });


        const all = Promise.all([walkingRequest2Promise, reservation1Success]).then(results => {
            processManager.reservation1StartTime = results[1].reservation.time;
            processManager.reservation1EndTime = addTenMinutes(results[1].reservation.time);
            processManager.reservation1Price = 0.75;  // TODO: compute the price somehow
            processManager.station1 = results[1].station.station;

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
                    processManager.reservation2StartTime = reservation2.reservation.time;
                    processManager.reservation2EndTime = addTenMinutes(reservation2.reservation.time);
                    processManager.reservation2Price = 0.75;  // TODO: compute the price somehow
                    processManager.station2 = reservation2.station.station;

                    // processManager.walking2Duration = reservation2.station.walking1Distance.duration;
                    // processManager.walking2DistanceText = reservation2.station.walking1Distance.distanceText;

                    processManager.arrivalTime = addSeconds(
                        reservation2.reservation.time,
                        reservation2.station.walking2Distance.duration
                    );


                    return fetchDirections(
                        tripQueryRequest.destination,
                        reservation2.station.station,
                        TravelMode.walking)
                        .then(walkingDirectionsReponse => {
                            processManager.walking2Points = getPointsFromDirections(walkingDirectionsReponse);
                            return processManager
                        });
                })
                .then(() => {
                    return fetchDirections(
                        processManager.station1,
                        processManager.station2,
                        TravelMode.bicycling)
                        .then(directionsResponse => {
                            processManager.bicyclingPoints = getPointsFromDirections(directionsResponse);
                            console.log(processManager);
                            return processManager;
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
