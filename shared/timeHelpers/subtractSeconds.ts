export const subtractSeconds = (time: Date, seconds: number): Date => {
    return new Date(time.getTime() - (seconds * 1000));
};
