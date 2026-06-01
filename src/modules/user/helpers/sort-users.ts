import type { SortOrder } from '@/shared/types/sort.type';
import type { SortUsersBy } from '@/modules/user/contracts/get-users.contract';
import type { User } from '@/modules/user/types/user.type';

export function sortUsers(
  users: Array<User>,
  sortBy?: SortUsersBy,
  sort?: SortOrder,
): Array<User> {
  if (!sortBy || !sort) return users;

  return users.sort((a, b) => {
    if (sort === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy].localeCompare(a[sortBy]);
  });
}
