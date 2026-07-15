import type { GetUsersQuery } from '@/modules/user/schemas/endpoints/get-users.schema';
import type { UserDto } from '@/modules/user/schemas/resources/user.schema';
import type { SortOrder } from '@/shared/types/sort.type';

export function sortUsers(
  users: Array<UserDto>,
  sortBy?: GetUsersQuery['sortBy'],
  sort?: SortOrder,
): Array<UserDto> {
  if (!sortBy || !sort) return users;

  return users.sort((a, b) => {
    if (sort === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy].localeCompare(a[sortBy]);
  });
}
