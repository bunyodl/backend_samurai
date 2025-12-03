import type { SortOrder } from '../../../shared/types/sort-order.type.js';
import type { User } from '../types/user.type.js';

export type SortUsersBy = 'name' | 'email';

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  sortBy?: SortUsersBy;
  order?: SortOrder;
  search?: string;
}

export interface GetUsersResponse {
  users: Array<User>;
  usersCount: number;
}
