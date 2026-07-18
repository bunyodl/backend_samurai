import { eventSchema } from '@/modules/event/schemas/resources/event.schema';

import { z } from '@/openapi/zod-openapi';

export const deleteEventResponseSchema = z
  .object({
    deletedEvent: eventSchema,
  })
  .openapi('DeleteEventResponse');

export type DeleteEventResponse = z.infer<typeof deleteEventResponseSchema>;
