import type { Response } from 'express';
import { HTTP_STATUS } from '@/common/constants/http-codes';
import type { ApiResponse } from '@/common/types/api-response.type';

type SendSuccessOptions<T> = {
  data: T;
  code?: number;
  message?: string;
};

export function sendSuccess<T>(
  res: Response<ApiResponse<T>>,
  { data, code = HTTP_STATUS.OK, message = 'Success.' }: SendSuccessOptions<T>,
) {
  return res.status(code).json({
    code,
    message,
    data,
    timestamp: Date.now(),
  });
}
