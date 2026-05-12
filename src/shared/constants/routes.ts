export const ROUTES = {
  home: '/',
  favorites: '/favorites',
  details: (id: string) => `/avenger/${id}`,
} as const;
