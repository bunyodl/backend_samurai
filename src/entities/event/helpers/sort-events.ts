import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { SortEventsBy } from '../contracts/get-events.contract';
import type { Event } from '../types/event.type';

export function sortEvents(
  events: Array<Event>,
  sortBy: SortEventsBy = 'title',
  order: SortOrder = 'asc',
): Array<Event> {
  return events.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }
    return a[sortBy] > b[sortBy] ? -1 : 1;
  });
}
