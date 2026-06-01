import type { SortOrder } from '@/shared/types/sort.type';
import type { SortVenuesBy } from '@/modules/venue/contracts/get-venues.contract';
import type { Venue } from '@/modules/venue/types/venue.type';

export function sortVenues(
  venues: Array<Venue>,
  sortBy?: SortVenuesBy,
  sort?: SortOrder,
): Array<Venue> {
  if (!sortBy || !sort) return venues;

  return venues.sort((a, b) => {
    if (sort === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy].localeCompare(a[sortBy]);
  });
}
