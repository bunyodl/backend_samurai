import { registry } from '../registry-instance.js';
import { apiResponseSchema } from '../schemas/shared.schema.js';
import {
  CreateEventRequestSchema,
  GetEventResponseSchema,
  GetEventsResponseSchema,
  getEventsQuerySchema,
} from '../schemas/event.schema.js';
import { z } from '../zod-openapi.js';

const getEventsApiResponseSchema = apiResponseSchema(
  GetEventsResponseSchema,
  'GetEventsApiResponse',
);

const getEventApiResponseSchema = apiResponseSchema(
  GetEventResponseSchema,
  'GetEventApiResponse',
);

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
              events: [
                {
                  id: 1,
                  title: 'Summer Music Festival',
                  description: 'A fantastic outdoor music festival',
                  venueId: 1,
                  organizerId: 1,
                  date: '2024-07-15T18:00:00Z',
                  tags: ['music', 'outdoor', 'festival'],
                  price: 50,
                },
              ],
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
    params: z.object({
      eventId: z.coerce
        .number()
        .int()
        .openapi({
          param: { name: 'eventId', in: 'path' },
          example: 1,
          description: 'Unique identifier of the event',
        }),
    }),
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
              event: {
                id: 1,
                title: 'Summer Music Festival',
                description: 'A fantastic outdoor music festival',
                venueId: 1,
                organizerId: 1,
                date: '2024-07-15T18:00:00Z',
                tags: ['music', 'outdoor', 'festival'],
                price: 50,
              },
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
          schema: CreateEventRequestSchema,
          example: {
            title: 'Summer Music Festival',
            description: 'A fantastic outdoor music festival',
            venueId: 1,
            organizerId: 1,
            date: '2024-07-15T18:00:00Z',
            tags: ['music', 'outdoor', 'festival'],
            price: 50,
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
