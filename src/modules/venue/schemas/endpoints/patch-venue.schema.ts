import { createVenueRequestBodySchema } from '@/modules/venue/schemas/endpoints/create-venue.schema';
import {
  type GetVenueParams,
  getVenueParamsSchema,
} from '@/modules/venue/schemas/endpoints/get-venue.schema';
import { venueSchema } from '@/modules/venue/schemas/resources/venue.schema';

import { z } from '@/openapi/zod-openapi';

export const patchVenueParamsSchema = getVenueParamsSchema;
export type PatchVenueParams = GetVenueParams;

export const patchVenueRequestBodySchema = createVenueRequestBodySchema
  .partial()
  .openapi('PatchVenueRequestBody');

export type PatchVenueRequestBody = z.infer<
  typeof patchVenueRequestBodySchema
>;

export const patchVenueResponseSchema = z
  .object({
    updatedVenue: venueSchema,
  })
  .openapi('PatchVenueResponse');

export type PatchVenueResponse = z.infer<typeof patchVenueResponseSchema>;
