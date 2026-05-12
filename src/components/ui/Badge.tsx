import type { ReactNode } from 'react';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'muted';
  children: ReactNode;
}

export function Badge({ variant = 'default', children }: BadgeProps) {
  const className =
    variant === 'primary' ? 'badge badge--primary' : variant === 'muted' ? 'badge badge--muted' : 'badge';

  return <span className={className}>{children}</span>;
}
