import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useFavoritesStore } from '../store/favoritesStore';
import { AppRouter } from './AppRouter';

function renderRouter(initialPath = '/') {
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

describe('AppRouter favorites integration', () => {
  beforeEach(() => {
    localStorage.clear();
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  it('adds a favorite from roster and removes it from favorites page', async () => {
    const user = userEvent.setup();
    renderRouter('/');

    await waitFor(() => {
      expect(screen.getByText('Roster')).toBeTruthy();
    });

    await waitFor(() => {
      expect(screen.getAllByRole('button', { name: 'Save' }).length).toBeGreaterThan(0);
    });

    const saveButtons = screen.getAllByRole('button', { name: 'Save' });

    await user.click(saveButtons[0]);

    await user.click(screen.getByRole('link', { name: 'Favorites' }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Favorites' })).toBeTruthy();
      expect(screen.getAllByRole('button', { name: 'Saved' }).length).toBeGreaterThan(0);
    });

    await user.click(screen.getAllByRole('button', { name: 'Saved' })[0]);

    await waitFor(() => {
      expect(screen.getByText('No favorites yet')).toBeTruthy();
    });
  });
});
