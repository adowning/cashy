import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteUser, RelatedUserModel } from "./index"

export const SessionModel = z.object({
  id: z.string(),
  userId: z.string(),
  activeGameId: z.string().nullish(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish(),
  expiresAt: z.date(),
  createdAt: z.date(),
  refreshToken: z.string().nullish(),
  active: z.boolean(),
  token: z.string(),
  updatedAt: z.date().nullish(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  user: CompleteUser
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  user: RelatedUserModel,
}))
