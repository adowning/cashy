import * as z from "zod"
import * as imports from "../../../../prisma/null"
import { FriendshipStatus } from "../../prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const friendshipModel = z.object({
  id: z.string(),
  status: z.nativeEnum(FriendshipStatus),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
  userId: z.string(),
  friendId: z.string(),
})

export interface Completefriendship extends z.infer<typeof friendshipModel> {
  user_friendship_friendIdTouser: CompleteUser
  user_friendship_userIdTouser: CompleteUser
}

/**
 * RelatedfriendshipModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedfriendshipModel: z.ZodSchema<Completefriendship> = z.lazy(() => friendshipModel.extend({
  user_friendship_friendIdTouser: RelatedUserModel,
  user_friendship_userIdTouser: RelatedUserModel,
}))
