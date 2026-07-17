import type { NextFunction, Request, Response } from 'express';
import type { ZodError, ZodType } from 'zod';
import { HTTP_STATUS } from '~/src/common/constants/http-codes';
import type {
  ApiErrorData,
  ApiResponse,
} from '~/src/common/types/api-response.type';

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
  const code = HTTP_STATUS.BAD_REQUEST;

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
