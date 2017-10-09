// import { EventType } from "../../shared/eventType"

import { EventType } from "../../../../shared/eventType";

export const processEvent = (currentInv: number, eventType: String ): number => {
    if (eventType === EventType.pickup) {
        return currentInv - 1;
    } else if (eventType === EventType.dropoff) {
        return currentInv + 1;
    }
};
