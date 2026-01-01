import type { Pagination } from '../../../shared/types/pagination.type.js';
import type { Sorting } from '../../../shared/types/sort.type.js';
import type { Venue } from '../types/venue.type.js';

export type SortVenuesBy = 'name' | 'capacity' | 'city' | 'country';

export interface GetVenuesQueryParams
  extends Pagination, Sorting<SortVenuesBy> {
  search?: string;
}

export interface GetVenuesResponse {
  venues: Array<Venue>;
  venuesCount: number;
}
