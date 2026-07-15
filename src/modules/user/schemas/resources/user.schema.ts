import {
  USER_ROLES,
  USER_ROLE_VALUES,
} from '@/modules/user/constants/user.constants';

import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const userRoleSchema = z.enum(USER_ROLE_VALUES).default(USER_ROLES.USER);

export const userSchema = z
  .object({
    id: uuidV7Schema,
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'Doe' }),
    email: z.email().openapi({ example: 'john.doe@example.com' }),
    imageUrl: z
      .string()
      .nullable()
      .openapi({ example: 'https://example.com/avatar.jpg' }),
    role: userRoleSchema.openapi({ example: 'user' }),
  })
  .extend(timestampsSchema.shape)
  .openapi('User');

export type UserDto = z.infer<typeof userSchema>;
