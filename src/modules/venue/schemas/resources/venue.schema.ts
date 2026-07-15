import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { z } from '@/openapi/zod-openapi';

export const venueSchema = z
  .object({
    id: z.uuid().openapi({
      example: '00000000-0000-4000-8000-000000000001',
    }),
    name: z.string().openapi({ example: 'Grand Convention Center' }),
    location: z.string().openapi({ example: 'New York, USA' }),
    timezone: z.string().openapi({ example: 'America/New_York' }),
    capacity: z.number().int().positive().openapi({ example: 5000 }),
  })
  .extend(timestampsSchema.shape)
  .openapi('Venue');

export type VenueDto = z.infer<typeof venueSchema>;
