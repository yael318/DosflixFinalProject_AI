// export enum AgeGroup
// {
//     Babies,
//     Children,
//     Teens,
//     Adult,
//     GoldenAge
// }
// export enum Status
// {
//     Oreder,
//     History
// }
// export enum Gender
// {
//     male,
//     female,
// }
// export enum CategoryGroup
// {
//     Children,
//     Recipes,
//     Nature,
//     Plot
// }
// models/CategoryGroup.ts
export const CategoryGroup = {
  Children: 'Children',
  Recipes: 'Recipes',
  Nature: 'Nature',
  Plot: 'Plot',
} as const;

export type CategoryGroupType = (typeof CategoryGroup)[keyof typeof CategoryGroup];
export const AgeGroup = {
  Babies: 'Babies',
  Children: 'Children',
  Teens: 'Teens',
  Adult: 'Adult',
  GoldenAge: 'GoldenAge',
} as const;

export type AgeGroupType = (typeof AgeGroup)[keyof typeof AgeGroup];

export interface MovieObject {

  Id: number;
  Name?: string;
  Description?: string;
  CategoryName?: string;
  AgeGroupName?: string;
  HasWoman?: boolean;
  LengthMinutes?: number;
  TotalViews?: number;
  TotalViewers?: number;
  ProductionDate?: Date;
  PriceBase?: number;
  PricePerExtraViewer?: number;
  PricePerExtraView?: number;
  FinalPrice?: number;
  MovieLink?: string;
  Image?: string;
}

export interface MovieUpdateDTO {
  Id: number;
  Name?: string;
  Description?: string;
  CategoryName?: string;
  AgeGroupName?: string;
  HasWoman?: boolean;
  LengthMinutes?: number;
  TotalViews?: number;
  TotalViewers?: number;
  ProductionDate?: Date;
  PriceBase?: number;
  PricePerExtraViewer?: number;
  PricePerExtraView?: number;
  FinalPrice?: number;
  MovieLink?: string;
  Image?: string;
}
export interface MovieCreateDTO {
  Name?: string;
  Description?: string;
  CodeCategory?: number | null;
  AgeGroup?: number | null;
  HasWoman?: boolean | null;
  LengthMinutes?: number | null;
  ProductionDate?: string | null;  // תאריך ב-ISO string, כי ב-JS אין DateOnly
  PriceBase?: number | null;
  PricePerExtraViewer?: number | null;
  PricePerExtraView?: number | null;
  MovieLink?: string | null;
  Image?: string | null;
}

