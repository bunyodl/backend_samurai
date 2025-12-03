import type { SortOrder } from '../../../shared/types/sort-order.type.js';
import type { Venue } from '../types/venue.type.js';

export type SortVenuesBy = 'name' | 'capacity' | 'city' | 'country';

export interface GetVenuesQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortVenuesBy;
  order?: SortOrder;
  search?: string;
}

export interface GetVenuesResponse {
  venues: Array<Venue>;
  venuesCount: number;
}
