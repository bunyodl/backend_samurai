import { createEventRequestSchema } from '@/modules/event/schemas/endpoints/create-event.schema';
import {
  getEventParamsSchema,
  getEventResponseSchema,
} from '@/modules/event/schemas/endpoints/get-event.schema';
import {
  getEventsQuerySchema,
  getEventsResponseSchema,
} from '@/modules/event/schemas/endpoints/get-events.schema';

import { registry } from '@/openapi/registry-instance';
import { apiResponseSchema } from '@/openapi/schemas/shared.schema';
import { z } from '@/openapi/zod-openapi';

const getEventsApiResponseSchema = apiResponseSchema(
  getEventsResponseSchema,
  'GetEventsApiResponse',
);

const getEventApiResponseSchema = apiResponseSchema(
  getEventResponseSchema,
  'GetEventApiResponse',
);

const eventExample = {
  id: '0190f5a3-0000-7000-8000-000000000001',
  title: 'Summer Music Festival',
  description: 'A fantastic outdoor music festival',
  type: 'in-person',
  status: 'published',
  venueId: '0190f5a3-0000-7000-8000-000000000001',
  organizerId: '0190f5a3-0000-7000-8000-000000000001',
  date: '2024-07-15T18:00:00.000Z',
  tags: ['music', 'outdoor', 'festival'],
  createdAt: '2024-07-01T12:00:00.000Z',
  updatedAt: null,
};

registry.registerPath({
  method: 'get',
  path: '/api/v1/events',
  summary: 'Retrieve a list of events',
  description:
    'Get a paginated and sortable list of events with optional search functionality',
  tags: ['events'],
  request: {
    query: getEventsQuerySchema,
  },
  responses: {
    200: {
      description: 'A list of events',
      content: {
        'application/json': {
          schema: getEventsApiResponseSchema,
          example: {
            code: 200,
            message: 'Events fetched successfully',
            data: {
              events: [eventExample],
              eventsCount: 25,
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
  path: '/api/v1/events/{eventId}',
  summary: 'Retrieve a single event by ID',
  description: 'Get detailed information about a specific event',
  tags: ['events'],
  request: {
    params: getEventParamsSchema,
  },
  responses: {
    200: {
      description: 'Event details',
      content: {
        'application/json': {
          schema: getEventApiResponseSchema,
          example: {
            code: 200,
            message: 'Event fetched successfully',
            data: {
              event: eventExample,
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
  path: '/api/v1/events',
  summary: 'Create a new event',
  description: 'Create a new event with the provided details',
  tags: ['events'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createEventRequestSchema,
          example: {
            title: 'Summer Music Festival',
            description: 'A fantastic outdoor music festival',
            type: 'in-person',
            status: 'draft',
            venueId: '0190f5a3-0000-7000-8000-000000000001',
            organizerId: '0190f5a3-0000-7000-8000-000000000001',
            date: '2024-07-15T18:00:00.000Z',
            tags: ['music', 'outdoor', 'festival'],
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Event created successfully',
      content: {
        'text/plain': {
          schema: z.string().openapi({ example: 'The event has been created' }),
          example: 'The event has been created',
        },
      },
    },
  },
});
