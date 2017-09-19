import { addSeconds } from "./addSeconds";

export const addMinutes = (time: Date, minutes): Date => {
    return addSeconds(time, 60 * minutes)
};
