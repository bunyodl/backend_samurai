import type { Request, Response } from 'express-serve-static-core';

import type { CreateUserRequestBody } from '@/modules/user/schemas/endpoints/create-user.schema';
import type { DeleteUserResponse } from '@/modules/user/schemas/endpoints/delete-user.schema';
import type {
  GetUserParams,
  GetUserResponse,
} from '@/modules/user/schemas/endpoints/get-user.schema';
import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import { userService } from '@/modules/user/user.service';

import { HTTP_STATUS } from '@/common/constants/http-codes';
import { sendSuccess } from '@/common/libs/send-success';
import type { ApiResponse } from '@/common/types/api-response.type';

export class UserController {
  async getMany(
    req: Request<{}, {}, {}, GetUsersQuery>,
    res: Response<ApiResponse<GetUsersResponse>>,
  ) {
    const data = await userService.getMany(req.query);
    return sendSuccess(res, { data });
  }

  async getById(
    req: Request<GetUserParams>,
    res: Response<ApiResponse<GetUserResponse>>,
  ) {
    const data = await userService.getById(req.params.userId);
    return sendSuccess(res, { data });
  }

  async create(
    req: Request<{}, {}, CreateUserRequestBody>,
    res: Response<ApiResponse<GetUserResponse>>,
  ) {
    const createdUser = await userService.create(req.body);

    return sendSuccess(res, {
      data: { user: createdUser },
      code: HTTP_STATUS.CREATED,
    });
  }

  async delete(
    req: Request<GetUserParams>,
    res: Response<ApiResponse<DeleteUserResponse>>,
  ) {
    const deletedUser = await userService.delete(req.params.userId);
    return sendSuccess(res, { data: { deletedUser } });
  }
}

export const userController = new UserController();
