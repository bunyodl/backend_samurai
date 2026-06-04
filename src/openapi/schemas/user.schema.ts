import { z } from '@/openapi/zod-openapi';

export const UserSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.email().openapi({ example: 'john.doe@example.com' }),
    role: z.enum(['organizer', 'attendee']).openapi({ example: 'organizer' }),
  })
  .openapi('User');

export const GetUsersResponseSchema = z
  .object({
    users: z.array(UserSchema),
    usersCount: z.number().openapi({ example: 15 }),
  })
  .openapi('GetUsersResponse');

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
      description: 'Search term to filter users by name or email',
    }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['name', 'email'])
      .optional()
      .openapi({ example: 'name', description: 'Field to sort by' }),
  })
  .openapi('GetUsersQuery');
