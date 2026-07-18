import { venueSchema } from '@/modules/venue/schemas/resources/venue.schema';

import { uuidV7Schema } from '@/openapi/schemas/uuid.schema';
import { z } from '@/openapi/zod-openapi';

export const getVenueParamsSchema = z.object({
  venueId: uuidV7Schema.openapi({
    param: { name: 'venueId', in: 'path' },
    description: 'Unique identifier of the venue',
  }),
});

export type GetVenueParams = z.infer<typeof getVenueParamsSchema>;

export const getVenueResponseSchema = z
  .object({
    venue: venueSchema,
  })
  .openapi('GetVenueResponse');

export type GetVenueResponse = z.infer<typeof getVenueResponseSchema>;
