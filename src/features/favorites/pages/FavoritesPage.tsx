import { Link } from 'react-router-dom';
import { StateMessage } from '../../../components/feedback/StateMessage';
import { AvengersGrid } from '../../avengers/components/AvengersGrid';
import { useAvengersQuery } from '../../avengers/hooks/useAvengersQuery';
import { useFavoritesStore } from '../../../app/store/favoritesStore';
import { Button } from '../../../components/ui/Button';

export function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const query = useAvengersQuery({ enabled: favoriteIds.length > 0 });

  const favoriteAvengers = query.data?.filter((avenger) => favoriteIds.includes(avenger.id)) ?? [];

  return (
    <div>
      <section className="hero">
        <p className="hero__eyebrow">Saved lineup</p>
        <h2 className="hero__title">Your favorite Avengers.</h2>
        <p className="hero__description">Keep the heroes you use the most in one place and jump back to them quickly.</p>
      </section>

      {favoriteIds.length === 0 ? (
        <StateMessage
          title="No favorites yet"
          description="Mark any character as saved from the roster or detail page to build your personal lineup."
          action={
            <Link className="button button--primary" to="/">
              Explore Avengers
            </Link>
          }
        />
      ) : (
        <section className="section">
          <div className="section__header">
            <h3 className="section__title">Favorites</h3>
            <Button variant="ghost" type="button" onClick={() => window.location.reload()}>
              Refresh
            </Button>
          </div>
          <AvengersGrid
            avengers={favoriteAvengers}
            isLoading={query.isPending}
            isError={query.isError}
            emptyTitle="No favorite Avengers available"
            emptyDescription="You may have removed the saved heroes. Add them again from the roster."
          />
        </section>
      )}
    </div>
  );
}
