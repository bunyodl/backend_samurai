import { venueSchema } from '@/modules/venue/schemas/resources/venue.schema';

import { z } from '@/openapi/zod-openapi';

export const deleteVenueResponseSchema = z
  .object({
    deletedVenue: venueSchema,
  })
  .openapi('DeleteVenueResponse');

export type DeleteVenueResponse = z.infer<typeof deleteVenueResponseSchema>;
