import { registry } from '../registry-instance.js';
import { apiResponseSchema } from '../schemas/shared.schema.js';
import {
  GetUsersResponseSchema,
  getUsersQuerySchema,
} from '../schemas/user.schema.js';

const getUsersApiResponseSchema = apiResponseSchema(
  GetUsersResponseSchema,
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
                  id: 1,
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                  role: 'organizer',
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
