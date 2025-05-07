import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { NotificationType } from "../../prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const notificationModel = z.object({
  id: z.string(),
  type: z.nativeEnum(NotificationType),
  title: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  readAt: z.date().nullish(),
  metadata: jsonSchema,
  createdAt: z.date(),
  userId: z.string(),
})

export interface Completenotification extends z.infer<typeof notificationModel> {
  user: CompleteUser
}

/**
 * RelatednotificationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatednotificationModel: z.ZodSchema<Completenotification> = z.lazy(() => notificationModel.extend({
  user: RelatedUserModel,
}))
