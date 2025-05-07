import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Gender, UserStatus } from "../../prisma/client"
import { CompleteOperator, RelatedOperatorModel, CompleteProfile, RelatedProfileModel, CompleteRainBet, RelatedRainBetModel, CompleteRainHistory, RelatedRainHistoryModel, CompleteRainTip, RelatedRainTipModel, CompleteRainWinner, RelatedRainWinnerModel, CompleteSession, RelatedSessionModel, CompleteAccount, RelatedAccountModel, Completechatmessage, RelatedchatmessageModel, Completefriendship, RelatedfriendshipModel, CompleteInvitation, RelatedInvitationModel, CompleteMember, RelatedMemberModel, Completenotification, RelatednotificationModel, Completetournamententry, RelatedtournamententryModel, CompleteTwoFactor, RelatedTwoFactorModel, Completeuserachievement, RelateduserachievementModel, CompleteVipInfo, RelatedVipInfoModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string(),
  emailVerified: z.boolean().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  twoFactorEnabled: z.boolean().nullish(),
  role: z.string().nullish(),
  banned: z.boolean().nullish(),
  banReason: z.string().nullish(),
  banExpires: z.date().nullish(),
  username: z.string(),
  passwordHash: z.string().nullish(),
  totalXp: z.number().int(),
  balance: z.number().int(),
  isVerified: z.boolean(),
  active: z.boolean(),
  lastLogin: z.date().nullish(),
  verificationToken: z.string().nullish(),
  avatar: z.string().nullish(),
  activeProfileId: z.string().nullish(),
  gender: z.nativeEnum(Gender).nullish(),
  status: z.nativeEnum(UserStatus).nullish(),
  cashtag: z.string().nullish(),
  phpId: z.number().int().nullish(),
  accessToken: z.string().nullish(),
  vipInfoId: z.string().nullish(),
  lastDailySpin: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  operator: CompleteOperator[]
  activeProfile: CompleteProfile[]
  RainBet: CompleteRainBet[]
  RainHistory: CompleteRainHistory[]
  RainTip: CompleteRainTip[]
  RainWinner: CompleteRainWinner[]
  sessions: CompleteSession[]
  accounts: CompleteAccount[]
  chatmessage: Completechatmessage[]
  friendship_friendship_friendIdTouser: Completefriendship[]
  friendship_friendship_userIdTouser: Completefriendship[]
  invitations: CompleteInvitation[]
  members: CompleteMember[]
  notification: Completenotification[]
  tournamententry: Completetournamententry[]
  twofactors: CompleteTwoFactor[]
  userachievement: Completeuserachievement[]
  vipInfo?: CompleteVipInfo | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  operator: RelatedOperatorModel.array(),
  activeProfile: RelatedProfileModel.array(),
  RainBet: RelatedRainBetModel.array(),
  RainHistory: RelatedRainHistoryModel.array(),
  RainTip: RelatedRainTipModel.array(),
  RainWinner: RelatedRainWinnerModel.array(),
  sessions: RelatedSessionModel.array(),
  accounts: RelatedAccountModel.array(),
  chatmessage: RelatedchatmessageModel.array(),
  friendship_friendship_friendIdTouser: RelatedfriendshipModel.array(),
  friendship_friendship_userIdTouser: RelatedfriendshipModel.array(),
  invitations: RelatedInvitationModel.array(),
  members: RelatedMemberModel.array(),
  notification: RelatednotificationModel.array(),
  tournamententry: RelatedtournamententryModel.array(),
  twofactors: RelatedTwoFactorModel.array(),
  userachievement: RelateduserachievementModel.array(),
  vipInfo: RelatedVipInfoModel.nullish(),
}))
