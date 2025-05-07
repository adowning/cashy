import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteOperator, RelatedOperatorModel, CompleteTransaction, RelatedTransactionModel } from "./index"

export const ProductModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  type: z.string(),
  bonusCode: z.string().nullish(),
  bonusTotalInCredits: z.number().int().nullish(),
  priceInCents: z.number().int(),
  amountToReceiveInCredits: z.number().int(),
  bestValue: z.number().int(),
  discountInCents: z.number().int(),
  bonusSpins: z.number().int().nullish(),
  isPromo: z.boolean().nullish(),
  totalDiscountInCents: z.number().int(),
  shopId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
})

export interface CompleteProduct extends z.infer<typeof ProductModel> {
  operator?: CompleteOperator | null
  transactions: CompleteTransaction[]
}

/**
 * RelatedProductModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProductModel: z.ZodSchema<CompleteProduct> = z.lazy(() => ProductModel.extend({
  operator: RelatedOperatorModel.nullish(),
  transactions: RelatedTransactionModel.array(),
}))
