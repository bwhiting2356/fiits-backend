import { addSeconds } from "./addSeconds";

export const addTenMinutes = (time: Date): Date => {
    return addSeconds(time, 60 * 10)
};
