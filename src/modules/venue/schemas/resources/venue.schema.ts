import { timestampsSchema } from '@/openapi/schemas/timestamps.schema';
import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const venueSchema = z
  .object({
    id: uuidV7Schema,
    name: z.string().openapi({ example: 'Grand Convention Center' }),
    location: z.string().openapi({ example: 'New York, USA' }),
    timezone: z.string().openapi({ example: 'America/New_York' }),
    capacity: z.number().int().positive().openapi({ example: 5000 }),
  })
  .extend(timestampsSchema.shape)
  .openapi('Venue');

export type VenueDto = z.infer<typeof venueSchema>;
