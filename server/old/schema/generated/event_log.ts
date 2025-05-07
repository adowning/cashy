import * as z from "zod"
import * as imports from "../../../../prisma/null"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const event_logModel = z.object({
  id: z.bigint(),
  table_name: z.string(),
  row_id: z.string().nullish(),
  operation: z.string(),
  payload: jsonSchema,
  created_at: z.date().nullish(),
})
