import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Completeachievement, RelatedachievementModel, CompleteUser, RelatedUserModel } from "./index"

export const userachievementModel = z.object({
  id: z.string(),
  progress: z.number().int(),
  isUnlocked: z.boolean(),
  unlockedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  userId: z.string(),
  achievementId: z.string(),
})

export interface Completeuserachievement extends z.infer<typeof userachievementModel> {
  achievement: Completeachievement
  user: CompleteUser
}

/**
 * RelateduserachievementModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelateduserachievementModel: z.ZodSchema<Completeuserachievement> = z.lazy(() => userachievementModel.extend({
  achievement: RelatedachievementModel,
  user: RelatedUserModel,
}))
