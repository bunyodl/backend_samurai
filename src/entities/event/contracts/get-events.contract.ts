import type { SortOrder } from '../../../shared/types/sort-order.type.js';
import type { Event } from '../types/event.type.js';

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
