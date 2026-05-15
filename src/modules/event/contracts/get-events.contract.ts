import type { Pagination } from '../../../shared/types/pagination.type.js';
import type { SortBy, Sorting } from '../../../shared/types/sort.type.js';
import type { EventApiModel } from '../types/event.type.js';

export type SortEventsBy = SortBy<
  EventApiModel,
  'title' | 'description' | 'date' | 'price'
>;

export interface GetEventsQueryParams
  extends Pagination, Sorting<SortEventsBy> {
  search?: string;
}

export interface GetEventsResponse {
  events: Array<EventApiModel>;
  eventsCount: number;
}
