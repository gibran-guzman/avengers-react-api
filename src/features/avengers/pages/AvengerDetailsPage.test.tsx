import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Avenger } from '../types/avenger';
import { AvengerDetailsPage } from './AvengerDetailsPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<object>('react-router-dom');

  return {
    ...actual,
    useParams: () => ({ id: 'thor' }),
  };
});

const mockUseAvengerDetailsQuery = vi.fn();

vi.mock('../hooks/useAvengerDetailsQuery', () => ({
  useAvengerDetailsQuery: (id?: string) => mockUseAvengerDetailsQuery(id),
}));

const sampleAvenger: Avenger = {
  id: 'thor',
  name: 'Thor Odinson',
  alias: 'Thor',
  team: 'Avengers',
  role: 'God of Thunder',
  universe: 'Earth-616',
  firstAppearance: 'Journey into Mystery #83',
  biography: 'Asgardian warrior and founding Avenger.',
  imageUrl: '',
  powers: ['Thunder', 'Flight'],
  status: 'Active',
};

describe('AvengerDetailsPage', () => {
  it('shows loading state', () => {
    mockUseAvengerDetailsQuery.mockReturnValue({ isPending: true, isError: false, data: null });

    render(<AvengerDetailsPage />);

    expect(screen.getByLabelText('Loading Avengers')).toBeTruthy();
  });

  it('shows error state', () => {
    mockUseAvengerDetailsQuery.mockReturnValue({ isPending: false, isError: true, data: null });

    render(<AvengerDetailsPage />);

    expect(screen.getByText('We could not load this hero')).toBeTruthy();
  });

  it('shows not found state', () => {
    mockUseAvengerDetailsQuery.mockReturnValue({ isPending: false, isError: false, data: null });

    render(<AvengerDetailsPage />);

    expect(screen.getByText('Hero not found')).toBeTruthy();
  });

  it('shows character details', () => {
    mockUseAvengerDetailsQuery.mockReturnValue({ isPending: false, isError: false, data: sampleAvenger });

    render(<AvengerDetailsPage />);

    expect(screen.getByText('Character details')).toBeTruthy();
    expect(screen.getByText('Thor')).toBeTruthy();
  });
});
