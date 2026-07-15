import {
  eventStatusSchema,
  eventTypeSchema,
} from '@/modules/event/schemas/resources/event.schema';

import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
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
    venueId: uuidV7Schema,
    organizerId: uuidV7Schema,
    date: z.iso.datetime().openapi({ example: '2024-07-15T18:00:00.000Z' }),
    tags: z
      .array(z.string())
      .nullable()
      .optional()
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
  })
  .openapi('CreateEventRequest');

export type CreateEventRequest = z.infer<typeof createEventRequestSchema>;
