import { z } from '@/openapi/zod-openapi';

export const VenueLocationSchema = z
  .object({
    city: z.string().openapi({ example: 'New York' }),
    country: z.string().openapi({ example: 'USA' }),
  })
  .openapi('VenueLocation');

export const VenueSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    name: z.string().openapi({ example: 'Grand Convention Center' }),
    location: VenueLocationSchema,
    capacity: z.number().openapi({ example: 5000 }),
  })
  .openapi('Venue');

export const GetVenuesResponseSchema = z
  .object({
    venues: z.array(VenueSchema),
    venuesCount: z.number().openapi({ example: 10 }),
  })
  .openapi('GetVenuesResponse');

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
    search: z
      .string()
      .optional()
      .openapi({
        example: 'convention center',
        description:
          'Search term to filter venues by name, city, or country',
      }),
    sort: z
      .enum(['asc', 'desc'])
      .optional()
      .openapi({ example: 'asc', description: 'Sort order' }),
    sortBy: z
      .enum(['name', 'capacity', 'city', 'country'])
      .optional()
      .openapi({ example: 'capacity', description: 'Field to sort by' }),
  })
  .openapi('GetVenuesQuery');
