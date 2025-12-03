import type { SortOrder } from '../../../shared/types/sort-order.type.js';
import type { SortUsersBy } from '../contracts/get-users.contract.js';
import type { User } from '../types/user.type.js';

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
