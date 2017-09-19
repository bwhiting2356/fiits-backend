const PRICE_PER_10_MINUTES = - 0.10;

export const getBicyclingPrice = (duration: number) => {
    const minutes = duration / 60;
    const tenMinIncrements = Math.ceil(minutes / 10);
    return tenMinIncrements * PRICE_PER_10_MINUTES;
}
