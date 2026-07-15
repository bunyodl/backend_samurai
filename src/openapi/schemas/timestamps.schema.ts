import { z } from '@/openapi/zod-openapi';

export const timestampsSchema = z
  .object({
    createdAt: z.iso
      .datetime()
      .openapi({ example: '2024-07-15T18:00:00.000Z' }),
    updatedAt: z.iso.datetime().nullable().openapi({ example: null }),
  })
  .openapi('Timestamps');

export type Timestamps = z.infer<typeof timestampsSchema>;
