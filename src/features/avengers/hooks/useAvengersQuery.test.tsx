import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { describe, expect, it } from 'vitest';
import { useAvengersQuery } from './useAvengersQuery';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useAvengersQuery', () => {
  it('returns data from the Avengers service', async () => {
    const { result } = renderHook(() => useAvengersQuery({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.length).toBeGreaterThan(0);
  });

  it('applies search filters', async () => {
    const { result } = renderHook(() => useAvengersQuery({ search: 'thor' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const aliases = result.current.data?.map((item) => item.alias.toLowerCase()) ?? [];
    expect(aliases.some((alias) => alias.includes('thor'))).toBe(true);
  });

  it('disables query execution when enabled is false', async () => {
    const { result } = renderHook(() => useAvengersQuery({ enabled: false }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.fetchStatus).toBe('idle');
    });

    expect(result.current.data).toBeUndefined();
  });
});
