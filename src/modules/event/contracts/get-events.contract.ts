import type { Pagination } from '@/shared/types/pagination.type';
import type { SortBy, Sorting } from '@/shared/types/sort.type';
import type { EventApiModel } from '@/modules/event/types/event.type';

export type SortEventsBy = SortBy<
  EventApiModel,
  'title' | 'description' | 'date' | 'price' | 'id'
>;

export interface GetEventsQueryParams
  extends Pagination, Sorting<SortEventsBy> {
  search?: string;
}

export interface GetEventsResponse {
  events: Array<EventApiModel>;
  eventsCount: number;
}
