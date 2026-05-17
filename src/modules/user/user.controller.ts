import type { ApiResponse } from '../../shared/types/api-response.type.js';
import type {
  GetUsersQueryParams,
  GetUsersResponse,
} from './contracts/get-users.contract.js';

import type { Request, Response } from 'express-serve-static-core';
import { HTTP_STATUS_CODES } from '../../shared/constants/http-codes.js';
import { userService } from './user.service.js';

export class UserController {
  async getUsers(
    req: Request<{}, {}, {}, GetUsersQueryParams>,
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
