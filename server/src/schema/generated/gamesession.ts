import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Completechatroom, RelatedchatroomModel, CompleteGame, RelatedGameModel, CompleteProfile, RelatedProfileModel, Completetournament, RelatedtournamentModel, CompleteTransaction, RelatedTransactionModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const gamesessionModel = z.object({
  id: z.string(),
  startTime: z.date(),
  endTime: z.date().nullish(),
  betAmount: z.number().int().nullish(),
  winAmount: z.number().int().nullish(),
  xpEarned: z.number().int(),
  metadata: jsonSchema,
  gameId: z.string(),
  tournamentId: z.string().nullish(),
  active: z.boolean(),
  profileId: z.string(),
})

export interface Completegamesession extends z.infer<typeof gamesessionModel> {
  chatroom: Completechatroom[]
  game: CompleteGame
  profile: CompleteProfile
  tournament?: Completetournament | null
  Transaction: CompleteTransaction[]
}

/**
 * RelatedgamesessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedgamesessionModel: z.ZodSchema<Completegamesession> = z.lazy(() => gamesessionModel.extend({
  chatroom: RelatedchatroomModel.array(),
  game: RelatedGameModel,
  profile: RelatedProfileModel,
  tournament: RelatedtournamentModel.nullish(),
  Transaction: RelatedTransactionModel.array(),
}))
