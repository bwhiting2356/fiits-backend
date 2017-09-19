import { EventType } from '../../../shared/eventType';

export const getType = (stationNumber: number): string => {
    return stationNumber === 1 ? EventType.pickup : EventType.dropoff;
};
