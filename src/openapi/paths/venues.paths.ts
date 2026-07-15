import {
  getVenuesQuerySchema,
  getVenuesResponseSchema,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';

import { registry } from '@/openapi/registry-instance';
import { apiResponseSchema } from '@/openapi/schemas/shared.schema';

const getVenuesApiResponseSchema = apiResponseSchema(
  getVenuesResponseSchema,
  'GetVenuesApiResponse',
);

registry.registerPath({
  method: 'get',
  path: '/api/v1/venues',
  summary: 'Retrieve a list of venues',
  description:
    'Get a paginated and sortable list of venues with optional search functionality',
  tags: ['venues'],
  request: {
    query: getVenuesQuerySchema,
  },
  responses: {
    200: {
      description: 'A list of venues',
      content: {
        'application/json': {
          schema: getVenuesApiResponseSchema,
          example: {
            code: 200,
            message: 'Venues fetched successfully',
            data: {
              venues: [
                {
                  id: '0190f5a3-0000-7000-8000-000000000001',
                  name: 'Grand Convention Center',
                  location: 'New York, USA',
                  timezone: 'America/New_York',
                  capacity: 5000,
                  createdAt: '2024-07-01T12:00:00.000Z',
                  updatedAt: null,
                },
              ],
              venuesCount: 10,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});
