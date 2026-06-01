import type { Pagination } from '@/shared/types/pagination.type';
import type { SortBy, Sorting } from '@/shared/types/sort.type';
import type { User } from '@/modules/user/types/user.type';

export type SortUsersBy = SortBy<User, 'name' | 'email'>;

export interface GetUsersQueryParams extends Pagination, Sorting<SortUsersBy> {
  search?: string;
}

export interface GetUsersResponse {
  users: Array<User>;
  usersCount: number;
}
