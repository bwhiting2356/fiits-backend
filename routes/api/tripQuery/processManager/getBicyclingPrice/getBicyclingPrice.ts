import { getMinutesFromSeconds } from "./getMinutesFromSeconds";
import { constants } from "./constants";
import { getIncrements } from "./getIncrements";
import { multiplyIncrementsByPrice } from "./multiplyIncrementsByPrice";

export const getBicyclingPrice = (seconds: number) => {
    const minutes = getMinutesFromSeconds(seconds);
    const increments = getIncrements(minutes, constants.INCREMENT_SIZE);
    return multiplyIncrementsByPrice(increments, constants.PRICE_PER_INCREMENT)
};
