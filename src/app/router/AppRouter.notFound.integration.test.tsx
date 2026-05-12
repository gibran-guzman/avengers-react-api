import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRouter } from './AppRouter';

function renderRouter(initialPath = '/missing-route') {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>
        <AppRouter />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('AppRouter not found integration', () => {
  it('renders the not found page for unknown routes', () => {
    renderRouter();

    expect(screen.getByText('That page is outside the mission perimeter')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Go home' })).toBeTruthy();
  });
});
