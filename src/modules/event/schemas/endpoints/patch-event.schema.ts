import { createEventRequestBodySchema } from '@/modules/event/schemas/endpoints/create-event.schema';
import {
  type GetEventParams,
  getEventParamsSchema,
} from '@/modules/event/schemas/endpoints/get-event.schema';
import { eventSchema } from '@/modules/event/schemas/resources/event.schema';

import { z } from '@/openapi/zod-openapi';

export const patchEventParamsSchema = getEventParamsSchema;
export type PatchEventParams = GetEventParams;

export const patchEventRequestBodySchema = createEventRequestBodySchema
  .partial()
  .omit({ organizerId: true })
  .openapi('PatchEventRequestBody');

export type PatchEventRequestBody = z.infer<typeof patchEventRequestBodySchema>;

export const patchEventResponseSchema = z
  .object({
    updatedEvent: eventSchema,
  })
  .openapi('PatchEventResponse');

export type PatchEventResponse = z.infer<typeof patchEventResponseSchema>;
