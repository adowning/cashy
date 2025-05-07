import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteOrganization, RelatedOrganizationModel, CompleteUser, RelatedUserModel } from "./index"

export const MemberModel = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.date(),
})

export interface CompleteMember extends z.infer<typeof MemberModel> {
  organization: CompleteOrganization
  user: CompleteUser
}

/**
 * RelatedMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMemberModel: z.ZodSchema<CompleteMember> = z.lazy(() => MemberModel.extend({
  organization: RelatedOrganizationModel,
  user: RelatedUserModel,
}))
