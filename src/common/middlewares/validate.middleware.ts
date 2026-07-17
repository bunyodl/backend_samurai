import type { NextFunction, Request, Response } from 'express';
import type { ZodError, ZodType } from 'zod';

import { BadRequestException } from '@/common/exceptions';

function formatZodIssues(error: ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.');
      return path ? `${issue.message} at "${path}"` : issue.message;
    })
    .join('; ');
}

export function validate(schema: {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { body, params, query } = schema;

    if (body) {
      const result = body.safeParse(req.body);
      if (!result.success) {
        throw new BadRequestException(
          `Invalid body: ${formatZodIssues(result.error)}`,
        );
      }
      req.body = result.data;
    }

    if (params) {
      const result = params.safeParse(req.params);
      if (!result.success) {
        throw new BadRequestException(
          `Invalid params: ${formatZodIssues(result.error)}`,
        );
      }
      req.params = result.data as typeof req.params;
    }

    if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) {
        throw new BadRequestException(
          `Invalid query: ${formatZodIssues(result.error)}`,
        );
      }
      req.query = result.data as typeof req.query;
    }

    next();
  };
}
