import type { APIResponse } from '~/src/shared/types/api-response.type';
import type {
  GetUsersQueryParams,
  GetUsersResponse,
} from './contracts/get-users.contract';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '~/src/shared/constants/http-codes';
import { userService } from './user.service';

export class UserController {
  async getUsers(
    req: Request<{}, {}, {}, GetUsersQueryParams>,
    res: Response<APIResponse<GetUsersResponse>>,
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
