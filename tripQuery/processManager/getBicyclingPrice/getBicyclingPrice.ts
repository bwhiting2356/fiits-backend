import { getMinutesFromSeconds } from "./getMinutesFromSeconds";
import { constants } from "./constants";
import { getIncrements } from "./getIncrements";

export const getBicyclingPrice = (seconds: number) => {
    const minutes = getMinutesFromSeconds(seconds);
    const tenMinIncrements = getIncrements(minutes, constants.INCREMENT_SIZE);
    return tenMinIncrements * constants.PRICE_PER_INCREMENT;
};
