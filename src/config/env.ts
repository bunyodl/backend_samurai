import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  API_URL: z.url(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().default(5432),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export const env = envSchema.parse({ ...process.env });
