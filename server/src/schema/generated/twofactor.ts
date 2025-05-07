import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteUser, RelatedUserModel } from "./index"

export const TwoFactorModel = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string(),
})

export interface CompleteTwoFactor extends z.infer<typeof TwoFactorModel> {
  user: CompleteUser
}

/**
 * RelatedTwoFactorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTwoFactorModel: z.ZodSchema<CompleteTwoFactor> = z.lazy(() => TwoFactorModel.extend({
  user: RelatedUserModel,
}))
