import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';

import { userRepository } from './user.repository';

class UserService {
  async getMany(params: GetUsersQuery): Promise<GetUsersResponse> {
    const [users, usersCount] = await Promise.all([
      userRepository.getMany(params),
      userRepository.getTotalCount(params.search),
    ]);

    return { users, usersCount };
  }
}

export const userService = new UserService();
