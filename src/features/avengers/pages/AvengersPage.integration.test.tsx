import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AvengersPage } from './AvengersPage';

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AvengersPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('AvengersPage integration', () => {
  it('loads roster and filters by search and team', async () => {
    const user = userEvent.setup();
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Roster')).toBeTruthy();
      expect(screen.getByText(/Showing\s+\d+\s+results\s+for\s+all heroes\./i)).toBeTruthy();
    });

    const searchField = screen.getByLabelText('Search');
    await user.type(searchField, 'thor');

    await waitFor(() => {
      expect(screen.getByText('Thor')).toBeTruthy();
      expect(screen.getByText(/Showing\s+1\s+result\s+for/i)).toBeTruthy();
    });

    const teamField = screen.getByLabelText('Team');
    await user.selectOptions(teamField, 'X-Men');

    await waitFor(() => {
      expect(screen.getByText('No Avengers matched your filters')).toBeTruthy();
    });
  });
});
