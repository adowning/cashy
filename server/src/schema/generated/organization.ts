import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { CompleteInvitation, RelatedInvitationModel, CompleteMember, RelatedMemberModel } from "./index"

export const OrganizationModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullish(),
  logo: z.string().nullish(),
  createdAt: z.date(),
  metadata: z.string().nullish(),
})

export interface CompleteOrganization extends z.infer<typeof OrganizationModel> {
  invitations: CompleteInvitation[]
  members: CompleteMember[]
}

/**
 * RelatedOrganizationModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedOrganizationModel: z.ZodSchema<CompleteOrganization> = z.lazy(() => OrganizationModel.extend({
  invitations: RelatedInvitationModel.array(),
  members: RelatedMemberModel.array(),
}))
