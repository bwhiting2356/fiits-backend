import { StationData } from "./stationData";

export const mapToDataValues = (sequelizeStations): StationData[] => {
    return sequelizeStations.map(station => station.dataValues );
};


