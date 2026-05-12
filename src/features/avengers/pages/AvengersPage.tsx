import { useMemo, useState } from 'react';
import { AvengersGrid } from '../components/AvengersGrid';
import { AvengersToolbar } from '../components/AvengersToolbar';
import { useAvengersQuery } from '../hooks/useAvengersQuery';
import { useDebouncedValue } from '../../../shared/utils/useDebouncedValue';

export function AvengersPage() {
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('all');
  const [status, setStatus] = useState('all');

  const debouncedSearch = useDebouncedValue(search, 250);
  const query = useAvengersQuery({ search: debouncedSearch, team, status });

  const summary = useMemo(() => {
    return {
      count: query.data?.length ?? 0,
      search,
    };
  }, [query.data?.length, search]);

  return (
    <div>
      <section className="hero">
        <p className="hero__eyebrow">Mission briefing</p>
        <h2 className="hero__title">Track every hero in one place.</h2>
        <p className="hero__description">
          Search by character, narrow the roster by team or status, and open a detail view without leaving the mission
          control center.
        </p>
      </section>

      <AvengersToolbar
        search={search}
        team={team}
        status={status}
        onSearchChange={setSearch}
        onTeamChange={setTeam}
        onStatusChange={setStatus}
        onReset={() => {
          setSearch('');
          setTeam('all');
          setStatus('all');
        }}
      />

      <section className="section">
        <div className="section__header">
          <h3 className="section__title">Roster</h3>
          <p className="section__description">
            Showing {summary.count} result{summary.count === 1 ? '' : 's'} for {summary.search ? `“${summary.search}”` : 'all heroes'}.
          </p>
        </div>

        <AvengersGrid
          avengers={query.data ?? []}
          isLoading={query.isPending}
          isError={query.isError}
          emptyTitle="No Avengers matched your filters"
          emptyDescription="Try a different name, clear the filters, or switch to another team."
        />
      </section>
    </div>
  );
}
