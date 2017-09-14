import { StationData } from "./stationData/StationData";

export const getDataValuesFromStations = (sequelizeStations): StationData[] => {
    return sequelizeStations.map(station => {
        return station.dataValues;
    });
};


