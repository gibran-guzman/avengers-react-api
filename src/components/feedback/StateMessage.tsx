import type { ReactNode } from 'react';

interface StateMessageProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function StateMessage({ title, description, action }: StateMessageProps) {
  return (
    <section className="state-message" role="status">
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </section>
  );
}
