import type { Pagination } from '@/shared/types/pagination.type';
import type { Sorting } from '@/shared/types/sort.type';
import type { Venue } from '@/modules/venue/types/venue.type';

export type SortVenuesBy = 'name' | 'capacity' | 'city' | 'country';

export interface GetVenuesQueryParams
  extends Pagination, Sorting<SortVenuesBy> {
  search?: string;
}

export interface GetVenuesResponse {
  venues: Array<Venue>;
  venuesCount: number;
}
