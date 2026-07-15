import { z } from '@/openapi/zod-openapi';

export const uuidV7Schema = z.uuidv7().openapi({
  example: '0190f5a3-8b7c-7def-8abc-1234567890ab',
});
