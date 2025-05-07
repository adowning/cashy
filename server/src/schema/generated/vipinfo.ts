import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteUser, RelatedUserModel } from "./index"

export const VipInfoModel = z.object({
  id: z.number().int(),
  level: z.number().int(),
  deposit_exp: z.number().int(),
  bet_exp: z.number().int(),
  rank_bet_exp: z.number().int(),
  rank_deposit_exp: z.number().int(),
  rank_name: z.string(),
  icon: z.string(),
  exp_switch_type: z.number().int(),
  now_deposit_exp: z.string(),
  level_deposit_exp: z.string(),
  now_bet_exp: z.string(),
  level_bet_exp: z.string(),
  telegram: z.string(),
  is_protection: z.boolean(),
  protection_deposit_exp: z.string(),
  protection_deposit_amount: z.string(),
  protection_bet_exp: z.string(),
  protection_bet_amount: z.string(),
  protection_days: z.number().int(),
  protection_switch: z.number().int(),
  cycle_award_switch: z.boolean(),
  level_award_switch: z.boolean(),
  signin_award_switch: z.boolean(),
  bet_award_switch: z.boolean(),
  withdrawal_award_switch: z.boolean(),
  unprotection_deposit_exp: z.string(),
  unprotection_deposit_amount: z.string(),
  unprotection_bet_exp: z.string(),
  unprotection_bet_amount: z.string(),
  unprotection_days: z.number().int(),
  unprotection_switch: z.number().int(),
  main_currency: z.string(),
  can_receive_level_award: z.boolean(),
  can_receive_rank_award: z.boolean(),
  can_receive_day_award: z.boolean(),
  can_receive_week_award: z.boolean(),
  can_receive_month_award: z.boolean(),
  can_receive_signin_award: z.boolean(),
  can_receive_bet_award: z.boolean(),
  can_receive_withdrawal_award: z.boolean(),
  userid: z.string(),
})

export interface CompleteVipInfo extends z.infer<typeof VipInfoModel> {
  user: CompleteUser
}

/**
 * RelatedVipInfoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVipInfoModel: z.ZodSchema<CompleteVipInfo> = z.lazy(() => VipInfoModel.extend({
  user: RelatedUserModel,
}))
