import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { User } from '../types/user.type';

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
