import type { Request, Response } from 'express-serve-static-core';

import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import { userService } from '@/modules/user/user.service';

import { HTTP_STATUS_CODES } from '@/shared/constants/http-codes';
import type { ApiResponse } from '@/shared/types/api-response.type';

export class UserController {
  async getUsers(
    req: Request<{}, {}, {}, GetUsersQuery>,
    res: Response<ApiResponse<GetUsersResponse>>,
  ) {
    const responseData = await userService.getUsers(req.query);

    return res.status(HTTP_STATUS_CODES.OK).json({
      code: HTTP_STATUS_CODES.OK,
      message: 'Users fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const userController = new UserController();
