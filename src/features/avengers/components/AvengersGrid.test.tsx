import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { Avenger } from '../types/avenger';
import { AvengersGrid } from './AvengersGrid';

const sampleAvenger: Avenger = {
  id: 'test-1',
  name: 'Tony Stark',
  alias: 'Iron Man',
  team: 'Avengers',
  role: 'Founder',
  universe: 'Earth-616',
  firstAppearance: 'Tales of Suspense #39',
  biography: 'A genius inventor.',
  imageUrl: '',
  powers: ['Armor'],
  status: 'Active',
};

describe('AvengersGrid', () => {
  it('renders loading state', () => {
    render(
      <MemoryRouter>
        <AvengersGrid
          avengers={[]}
          isLoading
          isError={false}
          emptyTitle="No data"
          emptyDescription="No data description"
        />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText('Loading Avengers')).toBeTruthy();
  });

  it('renders error state', () => {
    render(
      <MemoryRouter>
        <AvengersGrid
          avengers={[]}
          isLoading={false}
          isError
          emptyTitle="No data"
          emptyDescription="No data description"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('We could not load the roster')).toBeTruthy();
  });

  it('renders empty state', () => {
    render(
      <MemoryRouter>
        <AvengersGrid
          avengers={[]}
          isLoading={false}
          isError={false}
          emptyTitle="No roster"
          emptyDescription="Try another filter"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('No roster')).toBeTruthy();
    expect(screen.getByText('Try another filter')).toBeTruthy();
  });

  it('renders roster cards', () => {
    render(
      <MemoryRouter>
        <AvengersGrid
          avengers={[sampleAvenger]}
          isLoading={false}
          isError={false}
          emptyTitle="No roster"
          emptyDescription="Try another filter"
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Iron Man')).toBeTruthy();
    expect(screen.getByLabelText('Avengers roster')).toBeTruthy();
  });
});
