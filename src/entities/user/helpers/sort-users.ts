import type { SortOrder } from '~/src/shared/types/sort-order.type';
import type { SortUsersBy } from '../contracts/get-users.contract';
import type { User } from '../types/user.type';

export function sortUsers(
  users: Array<User>,
  sortBy: SortUsersBy = 'name',
  order: SortOrder = 'asc',
): Array<User> {
  return users.sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy].localeCompare(b[sortBy]);
    }
    return b[sortBy].localeCompare(a[sortBy]);
  });
}
