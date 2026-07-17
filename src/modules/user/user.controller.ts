import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS } from '~/src/common/constants/http-codes';
import type { ApiResponse } from '~/src/common/types/api-response.type';

import type {
  GetUsersQuery,
  GetUsersResponse,
} from '@/modules/user/schemas/endpoints/get-users.schema';
import { userService } from '@/modules/user/user.service';

export class UserController {
  async getMany(
    req: Request<{}, {}, {}, GetUsersQuery>,
    res: Response<ApiResponse<GetUsersResponse>>,
  ) {
    const responseData = await userService.getMany(req.query);

    return res.status(HTTP_STATUS.OK).json({
      code: HTTP_STATUS.OK,
      message: 'Users fetched successfully',
      data: responseData,
      timestamp: Date.now(),
    });
  }
}

export const userController = new UserController();
