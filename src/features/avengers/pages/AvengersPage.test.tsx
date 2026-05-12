import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AvengersPage } from './AvengersPage';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../shared/utils/useDebouncedValue', () => ({
  useDebouncedValue: (value: string) => value,
}));

const mockUseAvengersQuery = vi.fn();

vi.mock('../hooks/useAvengersQuery', () => ({
  useAvengersQuery: (params: unknown) => mockUseAvengersQuery(params),
}));

describe('AvengersPage', () => {
  it('renders roster data when query succeeds', () => {
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
        <AvengersPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Track every hero in one place.')).toBeTruthy();
    expect(screen.getByText('Thor')).toBeTruthy();
    expect(screen.getByText(/Showing\s+1\s+result/i)).toBeTruthy();
  });

  it('renders empty state when query returns no results', () => {
    mockUseAvengersQuery.mockReturnValue({
      data: [],
      isPending: false,
      isError: false,
    });

    render(
      <MemoryRouter>
        <AvengersPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('No Avengers matched your filters')).toBeTruthy();
  });

  it('renders error state when query fails', () => {
    mockUseAvengersQuery.mockReturnValue({
      data: [],
      isPending: false,
      isError: true,
    });

    render(
      <MemoryRouter>
        <AvengersPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('We could not load the roster')).toBeTruthy();
  });
});
