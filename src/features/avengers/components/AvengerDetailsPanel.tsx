import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { FavoriteToggleButton } from '../../favorites/components/FavoriteToggleButton';
import type { Avenger } from '../types/avenger';

interface AvengerDetailsPanelProps {
  avenger: Avenger;
}

export function AvengerDetailsPanel({ avenger }: AvengerDetailsPanelProps) {
  return (
    <div className="details">
      <div className="details__panel">
        <div className="details__image">
          {avenger.imageUrl ? <img src={avenger.imageUrl} alt={`${avenger.alias} portrait`} /> : null}
        </div>
        <div className="details__content">
          <div>
            <p className="hero__eyebrow">{avenger.team}</p>
            <h2 className="details__title">{avenger.alias}</h2>
            <p className="details__bio">{avenger.biography}</p>
          </div>

          <div className="card__meta">
            <Badge variant="primary">{avenger.status}</Badge>
            <Badge>{avenger.role}</Badge>
            <Badge variant="muted">{avenger.universe}</Badge>
          </div>

          <dl className="details__facts">
            <div className="fact">
              <dt>Real name</dt>
              <dd>{avenger.name}</dd>
            </div>
            <div className="fact">
              <dt>First appearance</dt>
              <dd>{avenger.firstAppearance}</dd>
            </div>
            <div className="fact">
              <dt>Primary powers</dt>
              <dd>{avenger.powers.length > 0 ? avenger.powers.join(', ') : 'No powers listed'}</dd>
            </div>
          </dl>

          <div className="details__actions">
            <FavoriteToggleButton avengerId={avenger.id} />
            <Button variant="secondary" type="button" onClick={() => window.history.back()}>
              Go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
