import { z } from 'zod';

const envSchema = z.object({
  VITE_AVENGERS_API_MODE: z.enum(['mock', 'remote']).default('mock'),
  VITE_AVENGERS_API_BASE_URL: z.string().trim().optional(),
  VITE_MARVEL_PUBLIC_API_KEY: z.string().trim().optional(),
  VITE_MARVEL_PRIVATE_API_KEY: z.string().trim().optional(),
});

export const appEnv = envSchema.parse(import.meta.env);

export function isRemoteMode() {
  return appEnv.VITE_AVENGERS_API_MODE === 'remote' && Boolean(appEnv.VITE_AVENGERS_API_BASE_URL);
}

export function hasMarvelCredentials() {
  return Boolean(appEnv.VITE_MARVEL_PUBLIC_API_KEY && appEnv.VITE_MARVEL_PRIVATE_API_KEY);
}
