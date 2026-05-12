export function SkeletonCard() {
  return (
    <article className="card" aria-hidden="true">
      <div className="card__media" />
      <div className="card__body">
        <div className="skeleton skeleton--title" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line" />
      </div>
    </article>
  );
}
