import { eventSchema } from '@/modules/event/schemas/resources/event.schema';
import { z } from '@/openapi/zod-openapi';

export const getEventParamsSchema = z.object({
  eventId: z.uuid().openapi({
    param: { name: 'eventId', in: 'path' },
    example: '00000000-0000-4000-8000-000000000001',
    description: 'Unique identifier of the event',
  }),
});

export type GetEventParams = z.infer<typeof getEventParamsSchema>;

export const getEventResponseSchema = z
  .object({
    event: eventSchema.nullable(),
  })
  .openapi('GetEventResponse');

export type GetEventResponse = z.infer<typeof getEventResponseSchema>;
