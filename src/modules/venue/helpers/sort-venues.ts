import type { GetVenuesQuery } from '@/modules/venue/schemas/endpoints/get-venues.schema';
import type { VenueDto } from '@/modules/venue/schemas/resources/venue.schema';
import type { SortOrder } from '@/shared/types/sort.type';

export function sortVenues(
  venues: Array<VenueDto>,
  sortBy?: GetVenuesQuery['sortBy'],
  sort?: SortOrder,
): Array<VenueDto> {
  if (!sortBy || !sort) return venues;

  return [...venues].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    const cmp =
      typeof aValue === 'number' && typeof bValue === 'number'
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue));
    return sort === 'asc' ? cmp : -cmp;
  });
}
