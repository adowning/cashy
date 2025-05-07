import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { ChatChannel } from "../../prisma/client"
import { Completechatroom, RelatedchatroomModel, CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const chatmessageModel = z.object({
  id: z.string(),
  content: z.string(),
  channel: z.nativeEnum(ChatChannel),
  metadata: jsonSchema,
  createdAt: z.date(),
  userId: z.string(),
  roomId: z.string().nullish(),
})

export interface Completechatmessage extends z.infer<typeof chatmessageModel> {
  chatroom?: Completechatroom | null
  user: CompleteUser
}

/**
 * RelatedchatmessageModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedchatmessageModel: z.ZodSchema<Completechatmessage> = z.lazy(() => chatmessageModel.extend({
  chatroom: RelatedchatroomModel.nullish(),
  user: RelatedUserModel,
}))
