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
