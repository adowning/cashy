import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { GameCategory } from "../../prisma/client"
import { CompleteOperator, RelatedOperatorModel, Completegamesession, RelatedgamesessionModel, Completetournamentgame, RelatedtournamentgameModel } from "./index"

export const GameModel = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  temperature: z.string().nullish(),
  developer: z.string().nullish(),
  vipLevel: z.number().int().nullish(),
  isActive: z.boolean().nullish(),
  device: z.number().int().nullish(),
  featured: z.boolean().nullish(),
  gamebank: z.string().nullish(),
  bet: z.number().nullish(),
  denomination: z.number().nullish(),
  categoryTemp: z.number().nullish(),
  originalId: z.number().int().nullish(),
  bids: z.number().int().nullish(),
  statIn: z.number().nullish(),
  statOut: z.number().nullish(),
  currentRtp: z.number().nullish(),
  rtpStatIn: z.number().nullish(),
  rtpStatOut: z.number().nullish(),
  standardRtp: z.number().nullish(),
  popularity: z.number().nullish(),
  chanceFirepot1: z.number().nullish(),
  chanceFirepot2: z.number().nullish(),
  chanceFirepot3: z.number().nullish(),
  fireCount1: z.number().nullish(),
  fireCount2: z.number().nullish(),
  fireCount3: z.number().nullish(),
  linesPercentConfigSpin: z.string().nullish(),
  linesPercentConfigSpinBonus: z.string().nullish(),
  linesPercentConfigBonus: z.string().nullish(),
  linesPercentConfigBonusBonus: z.string().nullish(),
  rezerv: z.number().nullish(),
  cask: z.number().nullish(),
  advanced: z.string().nullish(),
  scaleMode: z.string(),
  slotViewState: z.string(),
  view: z.number().int().nullish(),
  categoryId: z.string().nullish(),
  operatorId: z.string().nullish(),
  providerId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  jackpotGroupId: z.string().nullish(),
  active: z.boolean(),
  password: z.string().nullish(),
  category: z.nativeEnum(GameCategory),
})

export interface CompleteGame extends z.infer<typeof GameModel> {
  operator?: CompleteOperator | null
  gamesession: Completegamesession[]
  tournamentgame: Completetournamentgame[]
}

/**
 * RelatedGameModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedGameModel: z.ZodSchema<CompleteGame> = z.lazy(() => GameModel.extend({
  operator: RelatedOperatorModel.nullish(),
  gamesession: RelatedgamesessionModel.array(),
  tournamentgame: RelatedtournamentgameModel.array(),
}))
