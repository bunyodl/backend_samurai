import { authService } from '@/modules/auth/auth.service';
import type { CreateUserRequestBody } from '@/modules/user/schemas/endpoints/create-user.schema';
import type { GetUserResponse } from '@/modules/user/schemas/endpoints/get-user.schema';
import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import type { UserDto } from '@/modules/user/schemas/resources/user.schema';

import { ConflictException, NotFoundException } from '@/common/exceptions';

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

  async create(body: CreateUserRequestBody): Promise<UserDto> {
    const existingUser = await userRepository.getByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await authService.hash(body.password);
    const userRow = await userRepository.create(body, hashedPassword);
    return mapUserRowToDto(userRow);
  }

  async delete(userId: string): Promise<UserDto> {
    const userRow = await userRepository.delete(userId);

    if (!userRow) {
      throw new NotFoundException('User not found');
    }

    return mapUserRowToDto(userRow);
  }
}

export const userService = new UserService();
