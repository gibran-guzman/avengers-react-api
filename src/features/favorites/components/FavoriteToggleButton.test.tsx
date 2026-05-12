import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useFavoritesStore } from '../../../app/store/favoritesStore';
import { FavoriteToggleButton } from './FavoriteToggleButton';

describe('FavoriteToggleButton', () => {
  it('toggles favorite state on click', async () => {
    useFavoritesStore.setState({ favoriteIds: [] });
    const user = userEvent.setup();

    render(<FavoriteToggleButton avengerId="thor" />);

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button.getAttribute('aria-pressed')).toBe('false');

    await user.click(button);
    expect(screen.getByRole('button', { name: 'Saved' }).getAttribute('aria-pressed')).toBe('true');

    await user.click(screen.getByRole('button', { name: 'Saved' }));
    expect(screen.getByRole('button', { name: 'Save' }).getAttribute('aria-pressed')).toBe('false');
  });
});
