import { DistanceMatrixCache, Station } from "../../../db/db";
import { mapToDataValues } from "../stationData/mapToDataValues";
import { TravelMode } from "../../../shared/travelMode";
import { buildDistanceMatrixRequest } from "../distanceMatrix/buildDistanceMatrixRequest";
import { fetchDistanceMatrix } from "../distanceMatrix/fetchDistanceMatrix";
import { DistanceMatrixRequest } from "../distanceMatrix/distanceMatrixRequest";
import { mergeResultsWithIds } from "./mergeResultsWithIds";

export const cacheCoords = async (req) => {
    const exists = await DistanceMatrixCache.findOne({ where: { query: req.body } });

    if (!exists) {
        const stationData = await Station.findAll({ attributes: ['id', 'lat', 'lng'] })
            .then(data => mapToDataValues(data));

        const stationCoords = stationData.map(stationData => ({lat: stationData.lat, lng: stationData.lng}));

        const distanceMatrixRequest: DistanceMatrixRequest = {
            origins: req.body,
            destinations: stationCoords,
            mode: TravelMode.walking
        };

        const distanceMatrixResponse = await fetchDistanceMatrix(distanceMatrixRequest)
            .then(response => response.json.rows[0].elements);

        const mergedResults = mergeResultsWithIds(distanceMatrixResponse, stationData);
        DistanceMatrixCache.create({query: req.body, result: mergedResults })
    }
};


