import { z } from '@/openapi/zod-openapi';

export const createVenueRequestBodySchema = z
  .object({
    name: z.string().openapi({ example: 'Grand Convention Center' }),
    location: z.string().openapi({ example: 'New York, USA' }),
    timezone: z.string().openapi({ example: 'America/New_York' }),
    capacity: z.number().int().positive().openapi({ example: 5000 }),
  })
  .openapi('CreateVenueRequestBody');

export type CreateVenueRequestBody = z.infer<
  typeof createVenueRequestBodySchema
>;
