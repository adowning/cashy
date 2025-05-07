import * as z from "zod"
import * as imports from "../../../../prisma/null"

export const MessageModel = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  authorId: z.string(),
})
