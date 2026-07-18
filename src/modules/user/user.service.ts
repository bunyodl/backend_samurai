import type { CreateUserRequestBody } from '@/modules/user/schemas/endpoints/create-user.schema';
import type { GetUserResponse } from '@/modules/user/schemas/endpoints/get-user.schema';
import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import type { UserDto } from '@/modules/user/schemas/resources/user.schema';

import { NotFoundException } from '@/common/exceptions';
import { NotImplementedException } from '@/common/exceptions/not-implemented.exception';

import { mapUserRowToDto } from './helpers/map-user-row';
import { userRepository } from './user.repository';

class UserService {
  async getMany(params: GetUsersQuery): Promise<GetUsersResponse> {
    const [userRows, usersCount] = await Promise.all([
      userRepository.getMany(params),
      userRepository.getTotalCount(params.search),
    ]);

    const users = userRows.map(mapUserRowToDto);
    return { users, usersCount };
  }

  async getById(userId: string): Promise<GetUserResponse> {
    const userRow = await userRepository.getById(userId);

    if (!userRow) {
      throw new NotFoundException('User not found');
    }

    return { user: mapUserRowToDto(userRow) };
  }

  async create(_body: CreateUserRequestBody): Promise<UserDto> {
    // TODO(you): implement
    throw new NotImplementedException('UserService.create is not implemented');
  }

  async delete(_userId: string): Promise<UserDto> {
    // TODO(you): implement
    throw new NotImplementedException('UserService.delete is not implemented');
  }
}

export const userService = new UserService();
