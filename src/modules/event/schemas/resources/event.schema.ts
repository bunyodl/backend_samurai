import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { z } from '@/openapi/zod-openapi';

export const eventTypeSchema = z
  .enum(['in-person', 'online'])
  .default('in-person');
export const eventStatusSchema = z
  .enum(['draft', 'published', 'cancelled'])
  .default('draft');

export const eventSchema = z
  .object({
    id: z.uuid().openapi({
      example: '00000000-0000-4000-8000-000000000001',
    }),
    title: z.string().openapi({ example: 'Summer Music Festival' }),
    description: z
      .string()
      .nullable()
      .openapi({ example: 'A fantastic outdoor music festival' }),
    type: eventTypeSchema.openapi({ example: 'in-person' }),
    status: eventStatusSchema.openapi({ example: 'published' }),
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
      .openapi({ example: ['music', 'outdoor', 'festival'] }),
  })
  .extend(timestampsSchema.shape)
  .openapi('Event');

export type EventDto = z.infer<typeof eventSchema>;
