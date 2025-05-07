import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteRainBet, RelatedRainBetModel, CompleteUser, RelatedUserModel, CompleteRainTip, RelatedRainTipModel, CompleteRainWinner, RelatedRainWinnerModel } from "./index"

export const RainHistoryModel = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number().int(),
  rainType: z.string(),
  createdAt: z.date(),
})

export interface CompleteRainHistory extends z.infer<typeof RainHistoryModel> {
  RainBet: CompleteRainBet[]
  user: CompleteUser
  RainTip: CompleteRainTip[]
  RainWinner: CompleteRainWinner[]
}

/**
 * RelatedRainHistoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRainHistoryModel: z.ZodSchema<CompleteRainHistory> = z.lazy(() => RainHistoryModel.extend({
  RainBet: RelatedRainBetModel.array(),
  user: RelatedUserModel,
  RainTip: RelatedRainTipModel.array(),
  RainWinner: RelatedRainWinnerModel.array(),
}))
