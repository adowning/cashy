import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Completeuserachievement, RelateduserachievementModel } from "./index"

export const achievementModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  targetXp: z.number().int(),
  reward: z.number().int().nullish(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
})

export interface Completeachievement extends z.infer<typeof achievementModel> {
  userachievement: Completeuserachievement[]
}

/**
 * RelatedachievementModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedachievementModel: z.ZodSchema<Completeachievement> = z.lazy(() => achievementModel.extend({
  userachievement: RelateduserachievementModel.array(),
}))
