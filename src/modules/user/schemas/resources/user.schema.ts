import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { z } from '@/openapi/zod-openapi';

export const userRoleSchema = z.enum(['admin', 'user']).default('user');

export type UserRole = z.infer<typeof userRoleSchema>;

export const userSchema = z
  .object({
    id: z.uuid().openapi({
      example: '00000000-0000-4000-8000-000000000001',
    }),
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
