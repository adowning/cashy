import * as z from "zod"
import * as imports from "../../../../prisma/null"

export const operatorgameModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullish(),
  thumbnail: z.string().nullish(),
  minBet: z.number().int().nullish(),
  maxBet: z.number().int().nullish(),
  xpMultiplier: z.number(),
  isActive: z.boolean(),
  isPromoted: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  operatorId: z.string(),
})
