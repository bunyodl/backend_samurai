import { z } from '@/openapi/zod-openapi';

export function apiResponseSchema<T extends z.ZodTypeAny>(
  dataSchema: T,
  refId: string,
) {
  return z
    .object({
      code: z.number().openapi({ example: 200 }),
      message: z.string(),
      data: dataSchema,
      timestamp: z.number().openapi({ example: 1_704_067_200_000 }),
    })
    .openapi(refId);
}

export const apiErrorDataSchema = z
  .object({
    name: z.string().openapi({ example: 'ZodError' }),
    code: z.number().openapi({ example: 400 }),
    message: z.string().openapi({
      example: 'Invalid input: expected string, received number at "title"',
    }),
  })
  .openapi('ApiErrorData');

export const apiErrorResponseSchema = apiResponseSchema(
  apiErrorDataSchema.nullable(),
  'ApiErrorResponse',
);
