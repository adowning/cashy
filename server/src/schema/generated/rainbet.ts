import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteRainHistory, RelatedRainHistoryModel, CompleteUser, RelatedUserModel } from "./index"

export const RainBetModel = z.object({
  id: z.string(),
  rainHistoryId: z.string(),
  userId: z.string(),
  betAmount: z.number().int(),
  odds: z.number().int(),
  outcome: z.string().nullish(),
  settledAt: z.date().nullish(),
})

export interface CompleteRainBet extends z.infer<typeof RainBetModel> {
  RainHistory: CompleteRainHistory
  user: CompleteUser
}

/**
 * RelatedRainBetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRainBetModel: z.ZodSchema<CompleteRainBet> = z.lazy(() => RainBetModel.extend({
  RainHistory: RelatedRainHistoryModel,
  user: RelatedUserModel,
}))
