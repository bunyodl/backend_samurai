import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { SortVenuesBy } from '../contracts/get-venues.contract';
import type { Venue } from '../types/venue.type';

export function sortVenues(
  venues: Array<Venue>,
  sortBy: SortVenuesBy = 'name',
  order: SortOrder = 'asc',
): Array<Venue> {
  return venues.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy].localeCompare(a[sortBy]);
  });
}
