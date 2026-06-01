import type { Venue } from '@/modules/venue/types/venue.type';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function paginateVenues(
  venues: Array<Venue>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): Array<Venue> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return venues.slice(startIndex, endIndex);
}
