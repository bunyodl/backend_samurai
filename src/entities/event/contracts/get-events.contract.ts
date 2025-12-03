import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { Event } from '../types/event.type';

export type SortEventsBy = 'title' | 'description' | 'date' | 'price';

export interface GetEventsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortEventsBy;
  order?: SortOrder;
  search?: string;
}

export interface GetEventsResponse {
  events: Array<Event>;
  eventsCount: number;
}
