import {
  EVENT_STATUSES,
  EVENT_STATUS_VALUES,
  EVENT_TYPES,
  EVENT_TYPE_VALUES,
} from '@/modules/event/constants/event.constants';
import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const eventTypeSchema = z
  .enum(EVENT_TYPE_VALUES)
  .default(EVENT_TYPES.IN_PERSON);
export const eventStatusSchema = z
  .enum(EVENT_STATUS_VALUES)
  .default(EVENT_STATUSES.DRAFT);

export const eventSchema = z
  .object({
    id: uuidV7Schema,
    title: z.string().openapi({ example: 'Summer Music Festival' }),
    description: z
      .string()
      .nullable()
      .openapi({ example: 'A fantastic outdoor music festival' }),
    type: eventTypeSchema.openapi({ example: 'in-person' }),
    status: eventStatusSchema.openapi({ example: 'published' }),
    venueId: uuidV7Schema,
    organizerId: uuidV7Schema,
    date: z.iso.datetime().openapi({ example: '2024-07-15T18:00:00.000Z' }),
    tags: z
      .array(z.string())
      .nullable()
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
  })
  .extend(timestampsSchema.shape)
  .openapi('Event');

export type EventDto = z.infer<typeof eventSchema>;
