import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from '../../components/layout/AppShell';
import { AvengersPage } from '../../features/avengers/pages/AvengersPage';
import { AvengerDetailsPage } from '../../features/avengers/pages/AvengerDetailsPage';
import { FavoritesPage } from '../../features/favorites/pages/FavoritesPage';
import { NotFoundPage } from '../../shared/pages/NotFoundPage';
import { ROUTES } from '../../shared/constants/routes';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path={ROUTES.home} element={<AvengersPage />} />
        <Route path="/avenger/:id" element={<AvengerDetailsPage />} />
        <Route path={ROUTES.favorites} element={<FavoritesPage />} />
        <Route path="/home" element={<Navigate to={ROUTES.home} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
