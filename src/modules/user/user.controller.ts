import type { Request, Response } from 'express-serve-static-core';

import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import { userService } from '@/modules/user/user.service';

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
}

export const userController = new UserController();
