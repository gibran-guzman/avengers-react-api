import { Button } from '../../../components/ui/Button';
import { useFavoritesStore } from '../../../app/store/favoritesStore';

interface FavoriteToggleButtonProps {
  avengerId: string;
}

export function FavoriteToggleButton({ avengerId }: FavoriteToggleButtonProps) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(avengerId));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Button
      type="button"
      variant={isFavorite ? 'primary' : 'ghost'}
      aria-pressed={isFavorite}
      onClick={() => toggleFavorite(avengerId)}
    >
      {isFavorite ? 'Saved' : 'Save'}
    </Button>
  );
}
