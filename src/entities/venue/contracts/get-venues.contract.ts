import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { Venue } from '../types/venue.type';

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
