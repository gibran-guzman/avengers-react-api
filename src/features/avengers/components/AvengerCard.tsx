import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
import { ROUTES } from '../../../shared/constants/routes';
import { getInitials } from '../../../shared/utils/getInitials';
import type { Avenger } from '../types/avenger';
import { FavoriteToggleButton } from '../../favorites/components/FavoriteToggleButton';

interface AvengerCardProps {
  avenger: Avenger;
}

export const AvengerCard = memo(function AvengerCard({ avenger }: AvengerCardProps) {
  return (
    <Card>
      <div className="card__media">
        {avenger.imageUrl ? (
          <img src={avenger.imageUrl} alt={`${avenger.alias} portrait`} loading="lazy" />
        ) : (
          <div className="avatar-fallback" aria-hidden="true">
            {getInitials(avenger.alias)}
          </div>
        )}
      </div>
      <div className="card__body">
        <div className="card__title">
          <h3>{avenger.alias}</h3>
          <FavoriteToggleButton avengerId={avenger.id} />
        </div>
        <div className="card__meta">
          <Badge variant="primary">{avenger.team}</Badge>
          <Badge>{avenger.status}</Badge>
          <Badge variant="muted">{avenger.role}</Badge>
        </div>
        <p className="card__description">{avenger.biography}</p>
        <div className="card__actions">
          <Link className="button button--secondary" to={ROUTES.details(avenger.id)}>
            View details
          </Link>
        </div>
      </div>
    </Card>
  );
});
