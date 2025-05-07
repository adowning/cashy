import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteUser, RelatedUserModel, CompleteProfile, RelatedProfileModel, CompleteGame, RelatedGameModel, CompleteProduct, RelatedProductModel, Completetournament, RelatedtournamentModel } from "./index"

export const OperatorModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  logo: z.string().nullish(),
  description: z.string().nullish(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  acceptedPayments: z.string().array(),
  ownerId: z.string(),
  balance: z.number().int(),
})

export interface CompleteOperator extends z.infer<typeof OperatorModel> {
  owner: CompleteUser
  profiles: CompleteProfile[]
  games: CompleteGame[]
  products: CompleteProduct[]
  tournaments: Completetournament[]
}

/**
 * RelatedOperatorModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOperatorModel: z.ZodSchema<CompleteOperator> = z.lazy(() => OperatorModel.extend({
  owner: RelatedUserModel,
  profiles: RelatedProfileModel.array(),
  games: RelatedGameModel.array(),
  products: RelatedProductModel.array(),
  tournaments: RelatedtournamentModel.array(),
}))
