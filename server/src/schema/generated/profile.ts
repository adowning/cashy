import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteOperator, RelatedOperatorModel, CompleteUser, RelatedUserModel, Completegamesession, RelatedgamesessionModel, Completetournamententry, RelatedtournamententryModel, CompleteTransaction, RelatedTransactionModel } from "./index"

export const ProfileModel = z.object({
  id: z.string(),
  balance: z.number().int(),
  xpEarned: z.number().int(),
  isActive: z.boolean(),
  lastPlayed: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  phpId: z.number().int().nullish(),
  userId: z.string(),
  currency: z.string(),
  shopId: z.string(),
})

export interface CompleteProfile extends z.infer<typeof ProfileModel> {
  operator: CompleteOperator
  user_profile_userIdTouser: CompleteUser
  gamesession: Completegamesession[]
  tournamententry: Completetournamententry[]
  transactions: CompleteTransaction[]
}

/**
 * RelatedProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProfileModel: z.ZodSchema<CompleteProfile> = z.lazy(() => ProfileModel.extend({
  operator: RelatedOperatorModel,
  user_profile_userIdTouser: RelatedUserModel,
  gamesession: RelatedgamesessionModel.array(),
  tournamententry: RelatedtournamententryModel.array(),
  transactions: RelatedTransactionModel.array(),
}))
