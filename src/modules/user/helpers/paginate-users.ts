import type { User } from '@/modules/user/types/user.type';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function paginateUsers(
  users: Array<User>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): Array<User> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return users.slice(startIndex, endIndex);
}
