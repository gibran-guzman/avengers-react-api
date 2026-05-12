import { MemoryRouter } from 'react-router-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFavoritesStore } from '../../../app/store/favoritesStore';
import { FavoritesPage } from './FavoritesPage';

const mockUseAvengersQuery = vi.fn();

vi.mock('../../avengers/hooks/useAvengersQuery', () => ({
  useAvengersQuery: (params: unknown) => mockUseAvengersQuery(params),
}));

describe('FavoritesPage', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] });
    mockUseAvengersQuery.mockReset();
    mockUseAvengersQuery.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });
  });

  it('renders empty favorites state', () => {
    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('No favorites yet')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Explore Avengers' })).toBeTruthy();
  });

  it('renders favorite Avengers when ids exist', () => {
    useFavoritesStore.setState({ favoriteIds: ['thor'] });
    mockUseAvengersQuery.mockReturnValue({
      data: [
        {
          id: 'thor',
          name: 'Thor Odinson',
          alias: 'Thor',
          team: 'Avengers',
          role: 'God of Thunder',
          universe: 'Earth-616',
          firstAppearance: 'Journey into Mystery #83',
          biography: 'Asgardian warrior and founding Avenger.',
          imageUrl: '',
          powers: ['Thunder'],
          status: 'Active',
        },
      ],
      isPending: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );

    expect(screen.getAllByText('Favorites').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Thor').length).toBeGreaterThan(0);
  });
});
