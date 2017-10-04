export const getIncrements = (minutes: number, incrementSize: number): number => {
    return Math.ceil( minutes / incrementSize );
};
