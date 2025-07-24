// export enum Gender
// {
//     male,
//     female,
// }
// export enum AgeGroup
// {
   
//         Babies,
//         Children,
//         Teens,
//         Adult,
//         GoldenAge
    
// }
export const Gender={
    male:"male",
    female:"female"
}as const;
export type GenderType = (typeof Gender)[keyof typeof Gender];

export const AgeGroup = {
  Babies: 'Babies',
  Children: 'Children',
  Teens: 'Teens',
  Adult: 'Adult',
  GoldenAge: 'GoldenAge',
} as const;

export type AgeGroupType = (typeof AgeGroup)[keyof typeof AgeGroup];

export interface User {
    FullName: string
    Phone: string
   
   Gender:string
    AgeGroup:string
}
