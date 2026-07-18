import { userSchema } from '@/modules/user/schemas/resources/user.schema';

import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const getUserParamsSchema = z.object({
  userId: uuidV7Schema.openapi({
    param: { name: 'userId', in: 'path' },
    description: 'Unique identifier of the user',
  }),
});

export type GetUserParams = z.infer<typeof getUserParamsSchema>;

export const getUserResponseSchema = z
  .object({
    user: userSchema,
  })
  .openapi('GetUserResponse');

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
