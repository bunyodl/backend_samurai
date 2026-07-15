import {
  eventStatusSchema,
  eventTypeSchema,
} from '@/modules/event/schemas/resources/event.schema';
import { z } from '@/openapi/zod-openapi';

export const createEventRequestSchema = z
  .object({
    title: z.string().openapi({ example: 'Summer Music Festival' }),
    description: z
      .string()
      .nullable()
      .optional()
      .openapi({ example: 'A fantastic outdoor music festival' }),
    type: eventTypeSchema.optional().openapi({ example: 'in-person' }),
    status: eventStatusSchema.optional().openapi({ example: 'draft' }),
    venueId: z.uuid().openapi({
      example: '00000000-0000-4000-8000-000000000001',
    }),
    organizerId: z.uuid().openapi({
      example: '00000000-0000-4000-8000-000000000001',
    }),
    date: z.iso.datetime().openapi({ example: '2024-07-15T18:00:00.000Z' }),
    tags: z
      .array(z.string())
      .nullable()
      .optional()
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
  })
  .openapi('CreateEventRequest');

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
