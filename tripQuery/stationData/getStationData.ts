import { Station } from '../../db/db';
import { mapToDataValues } from "./mapToDataValues";
import { ProcessManager } from "../processManager/processManager";

export const getStationData = async (processManager: ProcessManager) => {
    return Station.findAll({ attributes: ['address', 'id', 'lat', 'lng', 'capacity', 'currentInv'] })
        .then(data => mapToDataValues(data))
        .then(stationData => {
            processManager.addStationData(stationData);
            return processManager;
        });
};
