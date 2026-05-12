export type AppErrorCode =
  | 'network_error'
  | 'timeout_error'
  | 'not_found'
  | 'rate_limit'
  | 'unknown_error';

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof DOMException && error.name === 'AbortError') {
    return new AppError('timeout_error', 'The request timed out.');
  }

  if (error instanceof Error && error.message.toLowerCase().includes('failed to fetch')) {
    return new AppError('network_error', 'The network request failed.');
  }

  return new AppError('unknown_error', 'Something unexpected happened.', error);
}
