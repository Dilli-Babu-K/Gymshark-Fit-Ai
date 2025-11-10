export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum BodyType {
  Lean = 'lean',
  Athletic = 'athletic',
  Bodybuilder = 'bodybuilder',
  Average = 'average',
  Curvy = 'curvy',
}

export enum FitPreference {
  Tight = 'tight',
  Regular = 'regular',
  Oversized = 'oversized',
}

export enum GarmentType {
  TShirt = 't-shirt',
  Hoodie = 'hoodie',
  Joggers = 'joggers',
  Leggings = 'leggings',
  Shorts = 'shorts',
  CompressionTop = 'compression top',
}

export type Unit = 'cm' | 'in' | 'kg' | 'lbs';

export interface FormData {
  gender: Gender;
  height: string;
  weight: string;
  bodyType: BodyType;
  fitPreference: FitPreference;
  garmentType: GarmentType;
  heightUnit: 'cm' | 'in';
  weightUnit: 'kg' | 'lbs';
  chest: string;
  waist: string;
  chestUnit: 'cm' | 'in';
  waistUnit: 'cm' | 'in';
}

export interface Recommendation {
  estimated_chest_cm: number;
  estimated_waist_cm: number;
  recommended_size: string;
  confidence: number;
  ai_used: boolean;
  reason: string;
}