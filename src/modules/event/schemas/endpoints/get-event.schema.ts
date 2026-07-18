import { eventSchema } from '@/modules/event/schemas/resources/event.schema';

import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const getEventParamsSchema = z.object({
  eventId: uuidV7Schema.openapi({
    param: { name: 'eventId', in: 'path' },
    description: 'Unique identifier of the event',
  }),
});

export type GetEventParams = z.infer<typeof getEventParamsSchema>;

export const getEventResponseSchema = z
  .object({
    event: eventSchema,
  })
  .openapi('GetEventResponse');

export type GetEventResponse = z.infer<typeof getEventResponseSchema>;
