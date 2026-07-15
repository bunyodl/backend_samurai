import { paginateUsers } from '@/modules/user/helpers/paginate-users';
import { searchUsers } from '@/modules/user/helpers/search-users';
import { sortUsers } from '@/modules/user/helpers/sort-users';
import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import type { UserDto } from '@/modules/user/schemas/resources/user.schema';

import { mockFetch } from '@/shared/libs/mock-fetch';

class UserService {
  async getUsers(params: GetUsersQuery): Promise<GetUsersResponse> {
    const { page, limit, sortBy, sort, search } = params;

    const result = await mockFetch('./db/users.json');
    const usersData = JSON.parse(result) as Array<UserDto>;

    const filteredUsers = searchUsers(usersData, search);
    const sortedUsers = sortUsers(filteredUsers, sortBy, sort);
    const paginatedUsers = paginateUsers(sortedUsers, page, limit);

    return {
      users: paginatedUsers,
      usersCount: filteredUsers.length,
    };
  }
}

export const userService = new UserService();
