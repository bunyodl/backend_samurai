import { registry } from '@/openapi/registry-instance';
import { apiResponseSchema } from '@/openapi/schemas/shared.schema';
import {
  GetVenuesResponseSchema,
  getVenuesQuerySchema,
} from '@/openapi/schemas/venue.schema';

const getVenuesApiResponseSchema = apiResponseSchema(
  GetVenuesResponseSchema,
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
                  id: 1,
                  name: 'Grand Convention Center',
                  location: {
                    city: 'New York',
                    country: 'USA',
                  },
                  capacity: 5000,
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
