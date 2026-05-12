import { describe, expect, it } from 'vitest';
import { AppError, toAppError } from './appError';

describe('toAppError', () => {
  it('returns same AppError if passed through', () => {
    const err = new AppError('not_found', 'Not found');
    const result = toAppError(err);
    expect(result).toBe(err);
  });

  it('maps AbortError DOMException to timeout_error', () => {
    const domEx = new DOMException('Aborted', 'AbortError');
    const result = toAppError(domEx);
    expect(result.code).toBe('timeout_error');
  });

  it('maps fetch failures to network_error', () => {
    const err = new Error('Failed to fetch');
    const result = toAppError(err);
    expect(result.code).toBe('network_error');
  });

  it('maps unknown values to unknown_error', () => {
    const result = toAppError('some-string' as unknown);
    expect(result.code).toBe('unknown_error');
  });
});
