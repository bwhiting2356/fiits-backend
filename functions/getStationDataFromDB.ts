import { StationData } from './stationData/StationData';
import { Station } from '../db/db';

export const getStationDataFromDB = (): Promise<StationData[]> => {
    return Station.findAll({ attributes: ['id', 'lat', 'lng', 'capacity', 'currentInv'] })
};
