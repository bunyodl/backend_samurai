import type { Pagination } from '../../../shared/types/pagination.type.js';
import type { SortBy, Sorting } from '../../../shared/types/sort.type.js';
import type { User } from '../types/user.type.js';

export type SortUsersBy = SortBy<User, 'name' | 'email'>;

export interface GetUsersQueryParams extends Pagination, Sorting<SortUsersBy> {
  search?: string;
}

export interface GetUsersResponse {
  users: Array<User>;
  usersCount: number;
}
