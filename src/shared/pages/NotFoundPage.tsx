import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export function NotFoundPage() {
  return (
    <section className="state-message" role="status">
      <p className="hero__eyebrow">404</p>
      <h2>That page is outside the mission perimeter</h2>
      <p>The route you requested does not exist. Return to the roster to continue.</p>
      <Link className="button button--primary" to={ROUTES.home}>
        Go home
      </Link>
    </section>
  );
}
