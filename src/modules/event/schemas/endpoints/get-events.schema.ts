import { eventSchema } from '@/modules/event/schemas/resources/event.schema';
import { z } from '@/openapi/zod-openapi';

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
    search: z.string().optional().openapi({
      description: 'Search term to filter events by title or description',
    }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['title', 'description', 'date', 'createdAt'])
      .optional()
      .openapi({ example: 'date', description: 'Field to sort by' }),
  })
  .openapi('GetEventsQuery');

export type GetEventsQuery = z.infer<typeof getEventsQuerySchema>;

export const getEventsResponseSchema = z
  .object({
    events: z.array(eventSchema),
    eventsCount: z.number().openapi({ example: 25 }),
  })
  .openapi('GetEventsResponse');

export type GetEventsResponse = z.infer<typeof getEventsResponseSchema>;
