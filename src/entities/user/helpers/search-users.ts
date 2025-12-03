import type { User } from '../types/user.type';

const fieldSelectors = [(u: User) => u.name, (u: User) => u.email];

export function searchUsers(users: Array<User>, search?: string): Array<User> {
  if (!search) return users;

  return users.filter((user) => {
    return fieldSelectors.some((getField) => {
      const field = getField(user);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
