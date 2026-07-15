import {
  getUsersQuerySchema,
  getUsersResponseSchema,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import { registry } from '@/openapi/registry-instance';
import { apiResponseSchema } from '@/openapi/schemas/shared.schema';

const getUsersApiResponseSchema = apiResponseSchema(
  getUsersResponseSchema,
  'GetUsersApiResponse',
);

registry.registerPath({
  method: 'get',
  path: '/api/v1/users',
  summary: 'Retrieve a list of users',
  description:
    'Get a paginated and sortable list of users with optional search functionality',
  tags: ['users'],
  request: {
    query: getUsersQuerySchema,
  },
  responses: {
    200: {
      description: 'A list of users',
      content: {
        'application/json': {
          schema: getUsersApiResponseSchema,
          example: {
            code: 200,
            message: 'Users fetched successfully',
            data: {
              users: [
                {
                  id: '00000000-0000-4000-8000-000000000001',
                  firstName: 'John',
                  lastName: 'Doe',
                  email: 'john.doe@example.com',
                  imageUrl: null,
                  role: 'user',
                  createdAt: '2024-07-01T12:00:00.000Z',
                  updatedAt: null,
                },
              ],
              usersCount: 15,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});
