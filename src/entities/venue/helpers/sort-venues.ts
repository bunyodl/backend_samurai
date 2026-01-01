import type { SortOrder } from '../../../shared/types/sort.type.js';
import type { SortVenuesBy } from '../contracts/get-venues.contract.js';
import type { Venue } from '../types/venue.type.js';

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
