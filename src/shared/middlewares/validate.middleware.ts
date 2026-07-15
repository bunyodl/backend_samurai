import type { Request, Response, NextFunction } from 'express';
import type { ZodError, ZodType } from 'zod';
import type {
  ApiErrorData,
  ApiResponse,
} from '@/shared/types/api-response.type';
import { HTTP_STATUS_CODES } from '@/shared/constants/http-codes';

function formatZodIssues(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      return path ? `${issue.message} at "${path}"` : issue.message;
    })
    .join('; ');
}

function validationError(
  res: Response<ApiResponse<ApiErrorData | null>>,
  message: string,
  error: ZodError,
) {
  const code = HTTP_STATUS_CODES.BAD_REQUEST;

  res.status(code).json({
    code,
    message,
    data: {
      name: 'ZodError',
      code,
      message: formatZodIssues(error),
    },
    timestamp: Date.now(),
  });
}

export function validate(schema: {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}) {
  return (
    req: Request,
    res: Response<ApiResponse<ApiErrorData | null>>,
    next: NextFunction,
  ) => {
    const { body, params, query } = schema;

    if (body) {
      const result = body.safeParse(req.body);
      if (!result.success) {
        validationError(res, 'Invalid body', result.error);
        return;
      }
      req.body = result.data;
    }

    if (params) {
      const result = params.safeParse(req.params);
      if (!result.success) {
        validationError(res, 'Invalid params', result.error);
        return;
      }
      req.params = result.data as typeof req.params;
    }

    if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) {
        validationError(res, 'Invalid query', result.error);
        return;
      }
      req.query = result.data as typeof req.query;
    }

    next();
  };
}
