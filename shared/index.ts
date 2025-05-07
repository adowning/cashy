import { Gender, Transaction, UserStatus, VipInfo } from "server/src/prisma/client";

export * from "./interfaces";
//@ts-ignore
export * from "./prisma/interfaces";
export * from "./types/NetworkCfg";
// export * from "./types/const";

export interface Operator {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  ownerId: string;
  balance: number;
  owner: User;
  // games: Game[];
  // profiles: Profile[];
  // tournaments: tournament[];
  // Product: Product[];
}

export interface Profile {
  id: string;
  balance: number;
  xpEarned: number;
  isActive: boolean;
  lastPlayed: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  phpId: number | null;
  userId: string;
  currency: string;
  shopId: string;
  // gamesession: gamesession[];
  // operator: Operator;
  // user_profile_userIdTouser: User;
  // tournamententry: tournamententry[];
  transactions: Transaction[];
}
export interface UserWithPassword extends User {
  passwordHash: string;
}
export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date | null;
  twoFactorEnabled: boolean | null;
  role: string | null;
  banned: boolean | null;
  banReason: string | null;
  banExpires: Date | null;
  lastDailySpin: Date | null;
  // sessions: Session[];
  // accounts: Account[];
  // members: Member[];
  // invitations: Invitation[];
  // twofactors: TwoFactor[];
  username: string;
  // passwordHash: string | null;
  totalXp: number;
  balance: number;
  isVerified: boolean;
  active: boolean;
  lastLogin: Date | null;
  verificationToken: string | null;
  avatar: string | null;
  activeProfileId: string | null;
  gender: Gender | null;
  status: UserStatus | null;
  cashtag: string | null;
  phpId: number | null;
  accessToken: string | null;
  // RainBet: RainBet[];
  // RainHistory: RainHistory[];
  // RainTip: RainTip[];
  // RainWinner: RainWinner[];
  // chatmessage: chatmessage[];
  // friendship_friendship_friendIdTouser: friendship[];
  // friendship_friendship_userIdTouser: friendship[];
  // notification: notification[];
  // operator: Operator[];
  activeProfile: Profile;
  // tournamententry: tournamententry[];
  // userachievement: userachievement[];
  vipInfo: VipInfo;
}
type EmailRequest = {
  key: string;
  to: string;
  from: string;
  subject: string;
  html: string;
};

export { EmailRequest };

export type AuthOptions = {
  user: string;
  pass?: string | "";
};

export type OauthOptions = {
  type?: string;
  user: string;
  clientId?: string;
  clientSecret?: string;
  refreshToken?: string | "";
  accessToken?: string | "";
};

export const authOptions: AuthOptions = {
  user: process.env.EMAIL_USER as string,
  pass: process.env.EMAIL_PASSWORD as string,
};

export const oauthOptions: OauthOptions = {
  type: "OAuth2",
  user: process.env.EMAIL_USER as string,
  clientId: (process.env.EMAIL_CLIENT_ID as string) || "",
  clientSecret: (process.env.EMAIL_CLIENT_SECRET as string) || "",
  refreshToken: (process.env.EMAIL_REFRESH_TOKEN as string) || "",
  accessToken: (process.env.EMAIL_ACCESS_TOKEN as string) || "",
};
