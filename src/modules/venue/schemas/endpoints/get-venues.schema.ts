import { venueSchema } from '@/modules/venue/schemas/resources/venue.schema';
import { z } from '@/openapi/zod-openapi';

export const getVenuesQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .min(1)
      .optional()
      .openapi({ example: 1, description: 'Page number for pagination' }),
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .optional()
      .openapi({ example: 10, description: 'Number of items per page' }),
    search: z.string().optional().openapi({
      example: 'convention center',
      description: 'Search term to filter venues by name or location',
    }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['name', 'capacity', 'location', 'timezone'])
      .optional()
      .openapi({ example: 'capacity', description: 'Field to sort by' }),
  })
  .openapi('GetVenuesQuery');

export type GetVenuesQuery = z.infer<typeof getVenuesQuerySchema>;

export const getVenuesResponseSchema = z
  .object({
    venues: z.array(venueSchema),
    venuesCount: z.number().openapi({ example: 10 }),
  })
  .openapi('GetVenuesResponse');

export type GetVenuesResponse = z.infer<typeof getVenuesResponseSchema>;
