import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function paginateVenues(
  venues: Array<VenueDto>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): Array<VenueDto> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return venues.slice(startIndex, endIndex);
}
