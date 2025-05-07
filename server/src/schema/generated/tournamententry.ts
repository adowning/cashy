import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteProfile, RelatedProfileModel, Completetournament, RelatedtournamentModel, CompleteUser, RelatedUserModel } from "./index"

export const tournamententryModel = z.object({
  id: z.string(),
  score: z.number().int(),
  wagered: z.number().int(),
  won: z.number().int(),
  joinedAt: z.date(),
  userId: z.string(),
  tournamentId: z.string(),
  profileId: z.string(),
})

export interface Completetournamententry extends z.infer<typeof tournamententryModel> {
  profile: CompleteProfile
  tournament: Completetournament
  user: CompleteUser
}

/**
 * RelatedtournamententryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedtournamententryModel: z.ZodSchema<Completetournamententry> = z.lazy(() => tournamententryModel.extend({
  profile: RelatedProfileModel,
  tournament: RelatedtournamentModel,
  user: RelatedUserModel,
}))
