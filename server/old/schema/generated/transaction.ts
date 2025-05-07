import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { TransactionType, TransactionStatus } from "../../prisma/client"
import { Completegamesession, RelatedgamesessionModel, CompleteProfile, RelatedProfileModel, CompleteProduct, RelatedProductModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const TransactionModel = z.object({
  id: z.string(),
  type: z.nativeEnum(TransactionType),
  amount: z.number().int(),
  amountCredits: z.number().int(),
  buyerCashtag: z.string().nullish(),
  buyerUserId: z.string().nullish(),
  username: z.string().nullish(),
  cashiername: z.string().nullish(),
  cashierAvatar: z.string().nullish(),
  cashierId: z.string().nullish(),
  reference: z.string().nullish(),
  status: z.nativeEnum(TransactionStatus),
  metadata: jsonSchema,
  isRealMoney: z.boolean(),
  paymentMethod: z.string().nullish(),
  paymentDetails: jsonSchema,
  createdAt: z.date(),
  processedAt: z.date().nullish(),
  gameSessionId: z.string().nullish(),
  profileId: z.string(),
  cashtag: z.string().nullish(),
  productid: z.string().nullish(),
})

export interface CompleteTransaction extends z.infer<typeof TransactionModel> {
  gamesession?: Completegamesession | null
  profile: CompleteProfile
  product?: CompleteProduct | null
}

/**
 * RelatedTransactionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTransactionModel: z.ZodSchema<CompleteTransaction> = z.lazy(() => TransactionModel.extend({
  gamesession: RelatedgamesessionModel.nullish(),
  profile: RelatedProfileModel,
  product: RelatedProductModel.nullish(),
}))
