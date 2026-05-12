import { z } from 'zod';

const envSchema = z.object({
  VITE_AVENGERS_API_MODE: z.enum(['mock', 'remote']).default('mock'),
  VITE_AVENGERS_API_BASE_URL: z.string().trim().optional(),
});

export const appEnv = envSchema.parse(import.meta.env);

export function isRemoteMode() {
  return appEnv.VITE_AVENGERS_API_MODE === 'remote' && Boolean(appEnv.VITE_AVENGERS_API_BASE_URL);
}
