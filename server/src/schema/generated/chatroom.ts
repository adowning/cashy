import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { Completechatmessage, RelatedchatmessageModel, Completegamesession, RelatedgamesessionModel } from "./index"

export const chatroomModel = z.object({
  id: z.string(),
  name: z.string(),
  isGameRoom: z.boolean(),
  createdAt: z.date(),
  gameSessionId: z.string().nullish(),
})

export interface Completechatroom extends z.infer<typeof chatroomModel> {
  chatmessage: Completechatmessage[]
  gamesession?: Completegamesession | null
}

/**
 * RelatedchatroomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedchatroomModel: z.ZodSchema<Completechatroom> = z.lazy(() => chatroomModel.extend({
  chatmessage: RelatedchatmessageModel.array(),
  gamesession: RelatedgamesessionModel.nullish(),
}))
