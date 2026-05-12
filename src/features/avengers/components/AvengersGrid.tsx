import { SkeletonCard } from '../../../components/feedback/SkeletonCard';
import { StateMessage } from '../../../components/feedback/StateMessage';
import type { Avenger } from '../types/avenger';
import { AvengerCard } from './AvengerCard';

interface AvengersGridProps {
  avengers: Avenger[];
  isLoading: boolean;
  isError: boolean;
  emptyTitle: string;
  emptyDescription: string;
}

export function AvengersGrid({ avengers, isLoading, isError, emptyTitle, emptyDescription }: AvengersGridProps) {
  if (isLoading) {
    return (
      <section className="grid" aria-label="Loading Avengers">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </section>
    );
  }

  if (isError) {
    return <StateMessage title="We could not load the roster" description="Try again in a moment." />;
  }

  if (avengers.length === 0) {
    return <StateMessage title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <section className="grid" aria-label="Avengers roster">
      {avengers.map((avenger) => (
        <AvengerCard key={avenger.id} avenger={avenger} />
      ))}
    </section>
  );
}
