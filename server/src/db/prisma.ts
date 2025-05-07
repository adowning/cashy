import { PrismaClient, Prisma, UserStatus, Profile, Transaction } from "../prisma/client";

let db: PrismaClient;
db = new PrismaClient();
if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  // Ensure a new PrismaClient is created on hot reload in development
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export default db;
// export { PrismaClient };

// export const db = new PrismaClient();
// export prisma as

// let userWithProfileAndOperatorInclude = {
//   include: {
//     activeProfile: {
//       include: {
//         operator: true, // Include the operator related to the profile
//         bank: true, // Include the bank related to the profile
//       },
//     },
//     operator: true, // Include the direct operator relation on User if it exists
//   },
// };

// // Use Prisma.UserGetPayload with the include structure to get the type
// export type User = Prisma.UserGetPayload<typeof userWithProfileAndOperatorInclude>;
// // import { BlackjackBet, Shop, Transaction } from 'prisma/client'
// // import { Shop } from 'prisma/client'
// import { Gender, ProfileType, UserStatus } from './enums'

// // import * as interfaces from './interfaces'

// // const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
// //   include: { activeProfile: { include: { shop: true } } },
// // });

// const userWithRelations = Prisma.validator<Prisma.UserDefaultArgs>()({
//   include: { activeProfile: { include: { transactions: true } } },
// });

// const profileWithRelations = Prisma.validator<Prisma.ProfileDefaultArgs>()({
//   include: { shop: true },
// })

// const shopWithRelations = Prisma.validator<Prisma.ShopDefaultArgs>()({
//   include: { products: true, profiles: true, games: true },
// })

// // const gameWithRelations = Prisma.validator<Prisma.GameDefaultArgs>()({
// //   include: { shop: true },
// // });

// // const spinDataWithRelations = Prisma.validator<Prisma.SpinDataDefaultArgs>()({
// //   // include: { shop: true },
// // });

// // 2: Define a type that only contains a subset of the scalar fields
// // const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
// //   select: { email: true, name: true },
// // })

// // 3: This type will include a user and all their posts
// // export type UserType = Prisma.UserGetPayload<typeof userWithRelations>;
// // export type TProfileType = Prisma.ProfileGetPayload<
// //   typeof profileWithRelations
// // >;
// export type Shop = Prisma.ShopGetPayload<typeof shopWithRelations>
// export type Profile = Prisma.ProfileGetPayload<typeof profileWithRelations>
// export type User = Prisma.UserGetPayload<typeof userWithRelations>
// // export type Game = Prisma.GameGetPayload<typeof gameWithRelations>;
// // export type SpinData = Prisma.GameGetPayload<typeof spinDataWithRelations>;
// // export type UserWithPassword = Prisma.UserGetPayload<
// //   typeof userWithRelationsAndPassword
// // >;

// export type UserT = User & {
//   activeProfile: Profile
// }

// export interface Profile {
//   // blackjackBets: BlackjackBet[]
//   // shop: Shop
//   // user: User
//   // purchases: Transaction[]
//   // owner: User | null
//   id: string;
//   // balance: number;
//   // vipPoints: number;
//   // countBalance: number;
//   // currency: string | null;
//   // isExcluded: boolean | null;
//   // isActive: boolean;
//   // faceVerificationTime: string | null;
//   // address: number | null;
//   // totalCashOut: number | null;
//   // totalSpins: number;
//   // totalCashIn: number | null;
//   // totalWon: number | null;
//   // totalBet: number | null;
//   // totalBonusWon: number | null;
//   rtp: number | null;
//   createdAt: Date;
//   updatedAt: Date;
//   // profileType: ProfileType
//   xp: number | null;
//   // mute: boolean;
//   // ban: boolean;
//   // verifiedAt: Date | null;
//   // userId: string;
//   // cashtag: string | null;
//   // email: string | null;
//   // shopId: string;
//   // ownerId: string;
//   // activeUserId: string;
//   // phpid: number | null;
//   // phpShopId: number | null;
// }

// export interface User {
//   id: string;
//   // phpid: number | null;
//   username: string;
//   email: string | null;
//   // age: number | null;
//   // gender: Gender;
//   // location: string | null;
//   // accessToken: string | null;
//   // password: string;
//   // avatar: string | null;
//   // isAnonymous: boolean | null;
//   // dateOfBirth: Date | null;
//   // phone: string | null;
//   // status: UserStatus;
//   // twoFactorEnabled: boolean | null;
//   // emailVerified: boolean | null;
//   // lastLogin: Date | null;
//   // createdAt: Date;
//   // updatedAt: Date;
//   // deletedAt: Date | null;
//   // isOnline: boolean | null;
//   // cashtag: string | null;
//   // isStaff: boolean | null;
//   // currentSessionId: string | null;
//   // activeProfileId: string | null;
//   // lastDailySpin: Date | null;
//   // vipRankLevel: number | null;
//   // // shop: Shop
//   // transactions: transaction[];
//   // balance: number;
//   // vipPoints: number;
//   // countBalance: number;
//   // currency: string | null;
//   // isExcluded: boolean | null;
//   // isActive: boolean;
//   // faceVerificationTime: string | null;
//   // address: number | null;
//   // totalCashOut: number | null;
//   // totalSpins: number;
//   // totalCashIn: number | null;
//   // totalWon: number | null;
//   // totalBet: number | null;
//   // totalBonusWon: number | null;
//   // rtp: number | null;
//   activeProfile: Profile;
//   // xp: number | null;
//   // verifiedAt: Date | null;
//   // phpShopId: number | null;
// }
// // // import { NumericChar } from "@faker-js/faker/modules/random"
// export declare type JsonObject = {
//   [Key in string]?: JsonValue;
// };
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
// export declare type JsonValue = string | number | boolean | JsonObject | JsonArray | null;
// export declare interface JsonArray extends Array<JsonValue> {}

// export interface SpinData {
//   id: string
//   gameId?: string | null
//   developer?: string | null
//   temperature?: string | null
//   betAmount?: number | null
//   winAmount?: number | null
//   spinNumber: number
//   gameSessionRTP?: number | null
//   playerBalanceAtStart?: number | null
//   gameBalance?: number | null
//   playerBalance?: number | null
//   profileId?: string | null
//   playerRTPToday?: string | null
//   sessionTotalBetAmount?: number | null
//   sessionTotalWinAmount?: number | null
//   playerWinTotalToday?: number | null
//   playerBetTotalToday?: number | null
//   createdAt: Date
//   updatedAt: Date
//   gameSessionId?: string | null
//   userSessionId?: string | null
//   sessionNetPosition?: number | null
// }
// 1: Define a type that includes the relation to `Post`
const userWithProfile = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { activeProfile: true },
});

// 2: Define a type that only contains a subset of the scalar fields
// const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
//   select: { email: true, activeProfile: true },
// })

// 3: This type will include a user and all their posts
type userWithProfile = Prisma.UserGetPayload<typeof userWithProfile>;

export interface UserWithProfile extends userWithProfile {}

// const shopWithProducts = Prisma.validator<Prisma.operatorDefaultArgs>()({
//   include: { products: { include: { Transaction: true } } },
// })

// 2: Define a type that only contains a subset of the scalar fields
// const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
//   select: { email: true, activeProfile: true },
// })

// 3: This type will include a user and all their posts
// export type ShopWithProducts = Prisma.ShopGetPayload<typeof shopWithProducts>

export type Gender = "BOY" | "GIRL" | "ALIEN" | "UNSURE" | "ROBOT" | "COMPLICATED";
