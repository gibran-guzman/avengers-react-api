import { AppError, toAppError } from '../errors/appError';

export interface HttpClientOptions {
  baseUrl: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

export function createHttpClient(options: HttpClientOptions) {
  const baseUrl = options.baseUrl.replace(/\/$/, '');
  const timeoutMs = options.timeoutMs ?? 10_000;

  async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${baseUrl}${path}`, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...(init?.headers ?? {}),
        },
        signal: controller.signal,
      });

      if (response.status === 404) {
        throw new AppError('not_found', 'The requested resource was not found.');
      }

      if (response.status === 429) {
        throw new AppError('rate_limit', 'The API rate limit was reached.');
      }

      if (!response.ok) {
        throw new AppError('unknown_error', `Request failed with status ${response.status}.`);
      }

      return (await response.json()) as T;
    } catch (error) {
      throw toAppError(error);
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  return {
    requestJson,
  };
}
