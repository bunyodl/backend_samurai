import { userSchema } from '@/modules/user/schemas/resources/user.schema';
import { z } from '@/openapi/zod-openapi';

export const getUsersQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .min(1)
      .optional()
      .openapi({ example: 1, description: 'Page number for pagination' }),
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .optional()
      .openapi({ example: 10, description: 'Number of items per page' }),
    search: z.string().optional().openapi({
      description:
        'Search term to filter users by first name, last name, or email',
    }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['firstName', 'lastName', 'email'])
      .optional()
      .openapi({ example: 'firstName', description: 'Field to sort by' }),
  })
  .openapi('GetUsersQuery');

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;

export const getUsersResponseSchema = z
  .object({
    users: z.array(userSchema),
    usersCount: z.number().openapi({ example: 15 }),
  })
  .openapi('GetUsersResponse');

export type GetUsersResponse = z.infer<typeof getUsersResponseSchema>;
