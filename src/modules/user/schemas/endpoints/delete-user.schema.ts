import { userSchema } from '@/modules/user/schemas/resources/user.schema';

import { z } from '@/openapi/zod-openapi';

export const deleteUserResponseSchema = z
  .object({
    deletedUser: userSchema,
  })
  .openapi('DeleteUserResponse');

export type DeleteUserResponse = z.infer<typeof deleteUserResponseSchema>;
