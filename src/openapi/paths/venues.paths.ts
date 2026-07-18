import { createVenueRequestBodySchema } from '@/modules/venue/schemas/endpoints/create-venue.schema';
import { deleteVenueResponseSchema } from '@/modules/venue/schemas/endpoints/delete-venue.schema';
import {
  getVenueParamsSchema,
  getVenueResponseSchema,
} from '@/modules/venue/schemas/endpoints/get-venue.schema';
import {
  getVenuesQuerySchema,
  getVenuesResponseSchema,
} from '@/modules/venue/schemas/endpoints/get-venues.schema';
import {
  patchVenueParamsSchema,
  patchVenueRequestBodySchema,
  patchVenueResponseSchema,
} from '@/modules/venue/schemas/endpoints/patch-venue.schema';

import { registry } from '@/openapi/registry-instance';
import { apiResponseSchema } from '@/openapi/schemas/shared.schema';

const getVenuesApiResponseSchema = apiResponseSchema(
  getVenuesResponseSchema,
  'GetVenuesApiResponse',
);

const getVenueApiResponseSchema = apiResponseSchema(
  getVenueResponseSchema,
  'GetVenueApiResponse',
);

const patchVenueApiResponseSchema = apiResponseSchema(
  patchVenueResponseSchema,
  'PatchVenueApiResponse',
);

const deleteVenueApiResponseSchema = apiResponseSchema(
  deleteVenueResponseSchema,
  'DeleteVenueApiResponse',
);

const venueExample = {
  id: '0190f5a3-0000-7000-8000-000000000001',
  name: 'Grand Convention Center',
  location: 'New York, USA',
  timezone: 'America/New_York',
  capacity: 5000,
  createdAt: '2024-07-01T12:00:00.000Z',
  updatedAt: null,
};

const createVenueBodyExample = {
  name: 'Grand Convention Center',
  location: 'New York, USA',
  timezone: 'America/New_York',
  capacity: 5000,
};

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
              venues: [venueExample],
              venuesCount: 10,
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
  path: '/api/v1/venues/{venueId}',
  summary: 'Retrieve a single venue by ID',
  description: 'Get detailed information about a specific venue',
  tags: ['venues'],
  request: {
    params: getVenueParamsSchema,
  },
  responses: {
    200: {
      description: 'Venue details',
      content: {
        'application/json': {
          schema: getVenueApiResponseSchema,
          example: {
            code: 200,
            message: 'Success.',
            data: {
              venue: venueExample,
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
  path: '/api/v1/venues',
  summary: 'Create a new venue',
  description: 'Create a new venue with the provided details',
  tags: ['venues'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createVenueRequestBodySchema,
          example: createVenueBodyExample,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Venue created successfully',
      content: {
        'application/json': {
          schema: getVenueApiResponseSchema,
          example: {
            code: 201,
            message: 'Success.',
            data: {
              venue: venueExample,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/api/v1/venues/{venueId}',
  summary: 'Patch a venue',
  description: 'Partially update an existing venue with the provided fields',
  tags: ['venues'],
  request: {
    params: patchVenueParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: patchVenueRequestBodySchema,
          example: {
            name: 'Updated Convention Center',
            capacity: 6000,
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Venue patched successfully',
      content: {
        'application/json': {
          schema: patchVenueApiResponseSchema,
          example: {
            code: 200,
            message: 'Success.',
            data: {
              updatedVenue: venueExample,
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
  path: '/api/v1/venues/{venueId}',
  summary: 'Delete a venue',
  description: 'Delete an existing venue by ID',
  tags: ['venues'],
  request: {
    params: getVenueParamsSchema,
  },
  responses: {
    200: {
      description: 'Venue deleted successfully',
      content: {
        'application/json': {
          schema: deleteVenueApiResponseSchema,
          example: {
            code: 200,
            message: 'Success.',
            data: {
              deletedVenue: venueExample,
            },
            timestamp: 1_704_067_200_000,
          },
        },
      },
    },
  },
});
