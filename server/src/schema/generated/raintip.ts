import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteRainHistory, RelatedRainHistoryModel, CompleteUser, RelatedUserModel } from "./index"

export const RainTipModel = z.object({
  id: z.string(),
  rainHistoryId: z.string(),
  userId: z.string(),
  tipAmount: z.number().int(),
  tippedAt: z.date(),
})

export interface CompleteRainTip extends z.infer<typeof RainTipModel> {
  RainHistory: CompleteRainHistory
  user: CompleteUser
}

/**
 * RelatedRainTipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRainTipModel: z.ZodSchema<CompleteRainTip> = z.lazy(() => RainTipModel.extend({
  RainHistory: RelatedRainHistoryModel,
  user: RelatedUserModel,
}))
