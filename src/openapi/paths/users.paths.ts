import { createUserRequestBodySchema } from '@/modules/user/schemas/endpoints/create-user.schema';
import { deleteUserResponseSchema } from '@/modules/user/schemas/endpoints/delete-user.schema';
import {
  getUserParamsSchema,
  getUserResponseSchema,
} from '@/modules/user/schemas/endpoints/get-user.schema';
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

const getUserApiResponseSchema = apiResponseSchema(
  getUserResponseSchema,
  'GetUserApiResponse',
);

const deleteUserApiResponseSchema = apiResponseSchema(
  deleteUserResponseSchema,
  'DeleteUserApiResponse',
);

const userExample = {
  id: '0190f5a3-0000-7000-8000-000000000001',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  imageUrl: null,
  role: 'user',
  createdAt: '2024-07-01T12:00:00.000Z',
  updatedAt: null,
};

const createUserBodyExample = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  password: 'securePassword1',
  imageUrl: null,
  role: 'user',
};

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
              users: [userExample],
              usersCount: 15,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/api/v1/users/{userId}',
  summary: 'Retrieve a single user by ID',
  description: 'Get detailed information about a specific user',
  tags: ['users'],
  request: {
    params: getUserParamsSchema,
  },
  responses: {
    200: {
      description: 'User details',
      content: {
        'application/json': {
          schema: getUserApiResponseSchema,
          example: {
            code: 200,
            message: 'Success.',
            data: {
              user: userExample,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/api/v1/users',
  summary: 'Create a new user',
  description:
    'Admin endpoint to provision another user account with an initial password',
  tags: ['users'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createUserRequestBodySchema,
          example: createUserBodyExample,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'User created successfully',
      content: {
        'application/json': {
          schema: getUserApiResponseSchema,
          example: {
            code: 201,
            message: 'Success.',
            data: {
              user: userExample,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/api/v1/users/{userId}',
  summary: 'Delete a user',
  description: 'Delete an existing user by ID',
  tags: ['users'],
  request: {
    params: getUserParamsSchema,
  },
  responses: {
    200: {
      description: 'User deleted successfully',
      content: {
        'application/json': {
          schema: deleteUserApiResponseSchema,
          example: {
            code: 200,
            message: 'Success.',
            data: {
              deletedUser: userExample,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});
