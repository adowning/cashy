import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteGame, RelatedGameModel, Completetournament, RelatedtournamentModel } from "./index"

export const tournamentgameModel = z.object({
  id: z.string(),
  multiplier: z.number(),
  tournamentId: z.string(),
  gameId: z.string(),
})

export interface Completetournamentgame extends z.infer<typeof tournamentgameModel> {
  game: CompleteGame
  tournament: Completetournament
}

/**
 * RelatedtournamentgameModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedtournamentgameModel: z.ZodSchema<Completetournamentgame> = z.lazy(() => tournamentgameModel.extend({
  game: RelatedGameModel,
  tournament: RelatedtournamentModel,
}))
