import type { UserDto } from '@/modules/user/schemas/resources/user.schema';

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

export function paginateUsers(
  users: Array<UserDto>,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): Array<UserDto> {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return users.slice(startIndex, endIndex);
}
