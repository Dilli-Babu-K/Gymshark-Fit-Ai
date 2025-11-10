const INCH_TO_CM = 2.54;
const KG_TO_LBS = 2.20462;

export const cmToIn = (cm: number): number => cm / INCH_TO_CM;
export const inToCm = (inches: number): number => inches * INCH_TO_CM;

export const kgToLbs = (kg: number): number => kg * KG_TO_LBS;
export const lbsToKg = (lbs: number): number => lbs / KG_TO_LBS;
