import type { SortOrder } from '../../../shared/types/sort.type.js';
import type { SortUsersBy } from '../contracts/get-users.contract.js';
import type { User } from '../types/user.type.js';

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
