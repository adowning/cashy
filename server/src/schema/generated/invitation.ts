import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteUser, RelatedUserModel, CompleteOrganization, RelatedOrganizationModel } from "./index"

export const InvitationModel = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().nullish(),
  status: z.string(),
  expiresAt: z.date(),
  inviterId: z.string(),
})

export interface CompleteInvitation extends z.infer<typeof InvitationModel> {
  user: CompleteUser
  organization: CompleteOrganization
}

/**
 * RelatedInvitationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedInvitationModel: z.ZodSchema<CompleteInvitation> = z.lazy(() => InvitationModel.extend({
  user: RelatedUserModel,
  organization: RelatedOrganizationModel,
}))
