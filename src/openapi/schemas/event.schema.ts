import { z } from '../zod-openapi.js';

export const EventSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: 'Summer Music Festival' }),
    description: z
      .string()
      .openapi({ example: 'A fantastic outdoor music festival' }),
    venueId: z.number().openapi({ example: 1 }),
    organizerId: z.number().openapi({ example: 1 }),
    date: z
      .string()
      .datetime()
      .openapi({ example: '2024-07-15T18:00:00Z' }),
    tags: z
      .array(z.string())
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
    price: z.number().openapi({ example: 50 }),
  })
  .openapi('Event');

export const GetEventsResponseSchema = z
  .object({
    events: z.array(EventSchema),
    eventsCount: z.number().openapi({ example: 25 }),
  })
  .openapi('GetEventsResponse');

export const GetEventResponseSchema = z
  .object({
    event: EventSchema.nullable(),
  })
  .openapi('GetEventResponse');

export const CreateEventRequestSchema = z
  .object({
    title: z.string().openapi({ example: 'Summer Music Festival' }),
    description: z
      .string()
      .openapi({ example: 'A fantastic outdoor music festival' }),
    venueId: z.number().openapi({ example: 1 }),
    organizerId: z.number().openapi({ example: 1 }),
    date: z
      .string()
      .datetime()
      .openapi({ example: '2024-07-15T18:00:00Z' }),
    tags: z
      .array(z.string())
      .optional()
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
    price: z.number().openapi({ example: 50 }),
  })
  .openapi('CreateEventRequest');

export const getEventsQuerySchema = z
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
    search: z
      .string()
      .optional()
      .openapi({
        example: 'music festival',
        description: 'Search term to filter events by title or description',
      }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['title', 'description', 'date', 'price'])
      .optional()
      .openapi({ example: 'date', description: 'Field to sort by' }),
  })
  .openapi('GetEventsQuery');
