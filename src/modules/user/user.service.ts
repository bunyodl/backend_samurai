import { mockFetch } from '@/shared/libs/mock-fetch';
import type {
  GetUsersQueryParams,
  GetUsersResponse,
} from '@/modules/user/contracts/get-users.contract';
import { paginateUsers } from '@/modules/user/helpers/paginate-users';
import { searchUsers } from '@/modules/user/helpers/search-users';
import { sortUsers } from '@/modules/user/helpers/sort-users';
import type { User } from '@/modules/user/types/user.type';

class UserService {
  async getUsers(params: GetUsersQueryParams): Promise<GetUsersResponse> {
    const { page, limit, sortBy, sort, search } = params;

    const result = await mockFetch('./db/users.json');
    const usersData = JSON.parse(result) as Array<User>;

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
