import type { UserDto } from '@/modules/user/schemas/resources/user.schema';

const fieldSelectors = [
  (u: UserDto) => u.firstName,
  (u: UserDto) => u.lastName,
  (u: UserDto) => u.email,
];

export function searchUsers(
  users: Array<UserDto>,
  search?: string,
): Array<UserDto> {
  if (!search) return users;

  return users.filter((user) => {
    return fieldSelectors.some((getField) => {
      const field = getField(user);
      return field.toLowerCase().includes(search.toLowerCase());
    });
  });
}
