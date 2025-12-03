import { mockFetch } from '../../shared/libs/mock-fetch.js';
import type {
  GetUsersQueryParams,
  GetUsersResponse,
} from './contracts/get-users.contract.js';
import { paginateUsers } from './helpers/paginate-users.js';
import { searchUsers } from './helpers/search-users.js';
import { sortUsers } from './helpers/sort-users.js';
import type { User } from './types/user.type.js';

class UserService {
  async getUsers(params: GetUsersQueryParams): Promise<GetUsersResponse> {
    const { page, limit, sortBy, order, search } = params;

    const result = await mockFetch('./db/users.json');
    const usersData = JSON.parse(result) as Array<User>;

    const filteredUsers = searchUsers(usersData, search);
    const sortedUsers = sortUsers(filteredUsers, sortBy, order);
    const paginatedUsers = paginateUsers(sortedUsers, page, limit);

    return {
      users: paginatedUsers,
      usersCount: filteredUsers.length,
    };
  }
}

export const userService = new UserService();
