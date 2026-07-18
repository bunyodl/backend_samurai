import { userRoleSchema } from '@/modules/user/schemas/resources/user.schema';

import { z } from '@/openapi/zod-openapi';

export const createUserRequestBodySchema = z
  .object({
    firstName: z.string().openapi({ example: 'John' }),
    lastName: z.string().openapi({ example: 'Doe' }),
    email: z.email().openapi({ example: 'john.doe@example.com' }),
    password: z.string().min(8).openapi({ example: 'securePassword1' }),
    imageUrl: z
      .string()
      .nullable()
      .optional()
      .openapi({ example: 'https://example.com/avatar.jpg' }),
    role: userRoleSchema.optional().openapi({ example: 'user' }),
  })
  .openapi('CreateUserRequestBody');

export type CreateUserRequestBody = z.infer<
  typeof createUserRequestBodySchema
>;
