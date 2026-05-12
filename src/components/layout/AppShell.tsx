import { NavLink, Outlet } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/routes';

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true" />
      <div className="app-shell__content">
        <header className="site-header">
          <div className="site-header__brand">
            <h1 className="site-header__title">Avengers Archive</h1>
            <p className="site-header__subtitle">A focused mission control for heroes, allies, and favorites.</p>
          </div>
          <nav className="site-header__nav" aria-label="Primary navigation">
            <NavLink to={ROUTES.home} end>
              Avengers
            </NavLink>
            <NavLink to={ROUTES.favorites}>Favorites</NavLink>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
