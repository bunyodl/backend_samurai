import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from '@/common/constants/http-codes';
import { HttpException } from '@/common/exceptions/http.exception';
import type {
  ApiErrorData,
  ApiResponse,
} from '@/common/types/api-response.type';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response<ApiResponse<ApiErrorData>>,
  _next: NextFunction,
) {
  if (err instanceof HttpException) {
    const code = err.statusCode;

    return res.status(code).json({
      code,
      message: err.message,
      data: {
        name: err.name,
        code,
        message: err.message,
      },
      timestamp: Date.now(),
    });
  }

  const code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = 'Internal server error';

  return res.status(code).json({
    code,
    message,
    data: {
      name: 'InternalServerError',
      code,
      message,
    },
    timestamp: Date.now(),
  });
}
