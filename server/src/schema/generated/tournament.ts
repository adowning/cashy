import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Completegamesession, RelatedgamesessionModel, CompleteOperator, RelatedOperatorModel, Completetournamententry, RelatedtournamententryModel, Completetournamentgame, RelatedtournamentgameModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const tournamentModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  startTime: z.date(),
  endTime: z.date(),
  entryFee: z.number().int().nullish(),
  prizePool: z.number().int(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  operatorId: z.string(),
  leaderboard: jsonSchema,
})

export interface Completetournament extends z.infer<typeof tournamentModel> {
  gamesession: Completegamesession[]
  operator: CompleteOperator
  tournamententry: Completetournamententry[]
  tournamentgame: Completetournamentgame[]
}

/**
 * RelatedtournamentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedtournamentModel: z.ZodSchema<Completetournament> = z.lazy(() => tournamentModel.extend({
  gamesession: RelatedgamesessionModel.array(),
  operator: RelatedOperatorModel,
  tournamententry: RelatedtournamententryModel.array(),
  tournamentgame: RelatedtournamentgameModel.array(),
}))
