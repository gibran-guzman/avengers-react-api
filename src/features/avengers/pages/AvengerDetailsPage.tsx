import { useParams } from 'react-router-dom';
import { StateMessage } from '../../../components/feedback/StateMessage';
import { AvengersGrid } from '../components/AvengersGrid';
import { AvengerDetailsPanel } from '../components/AvengerDetailsPanel';
import { useAvengerDetailsQuery } from '../hooks/useAvengerDetailsQuery';

export function AvengerDetailsPage() {
  const params = useParams();
  const query = useAvengerDetailsQuery(params.id);

  if (query.isPending) {
    return <AvengersGrid avengers={[]} isLoading emptyTitle="Loading" emptyDescription="Loading details" isError={false} />;
  }

  if (query.isError) {
    return <StateMessage title="We could not load this hero" description="The details request failed." />;
  }

  if (!query.data) {
    return <StateMessage title="Hero not found" description="The selected Avenger does not exist in the roster." />;
  }

  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title">Character details</h2>
      </div>
      <AvengerDetailsPanel avenger={query.data} />
    </section>
  );
}
