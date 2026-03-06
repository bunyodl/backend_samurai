import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  API_URL: z.url(),
});

export const env = envSchema.parse({ ...process.env });
