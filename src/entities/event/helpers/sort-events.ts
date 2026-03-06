import type { SortOrder } from '../../../shared/types/sort.type.js';
import type { SortEventsBy } from '../contracts/get-events.contract.js';
import type { EventApiModel } from '../types/event.type.js';

export function sortEvents(
  events: Array<EventApiModel>,
  sortBy?: SortEventsBy,
  sort?: SortOrder,
): Array<EventApiModel> {
  if (!sortBy || !sort) return events;

  return events.sort((a, b) => {
    if (sort === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }
    return a[sortBy] > b[sortBy] ? -1 : 1;
  });
}
