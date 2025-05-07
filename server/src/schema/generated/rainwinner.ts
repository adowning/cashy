import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteRainHistory, RelatedRainHistoryModel, CompleteUser, RelatedUserModel } from "./index"

export const RainWinnerModel = z.object({
  id: z.string(),
  rainHistoryId: z.string(),
  userId: z.string(),
  wonAmount: z.number().int(),
  wonAt: z.date(),
})

export interface CompleteRainWinner extends z.infer<typeof RainWinnerModel> {
  RainHistory: CompleteRainHistory
  user: CompleteUser
}

/**
 * RelatedRainWinnerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRainWinnerModel: z.ZodSchema<CompleteRainWinner> = z.lazy(() => RainWinnerModel.extend({
  RainHistory: RelatedRainHistoryModel,
  user: RelatedUserModel,
}))
