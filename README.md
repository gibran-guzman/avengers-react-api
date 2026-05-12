# Avengers Archive

Avengers Archive is a React + TypeScript application for browsing Avengers characters with search, filtering, character details, and favorites management. The app is built with a feature-based structure and a strong separation between UI, domain logic, and data access.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Vitest
- React Testing Library
- ESLint
- Prettier

## Features

- Avengers listing page
- Search by character name or alias
- Filters by team and status
- Character details view
- Favorites management with persistence
- Loading, empty, error, and success states
- Not found page
- Responsive layout

## Architecture

The project uses a feature-based structure:

```text
src/
	app/
		providers/
		router/
		store/
	components/
		feedback/
		layout/
		ui/
	features/
		avengers/
			api/
			components/
			hooks/
			mappers/
			mock/
			pages/
			services/
			types/
			utils/
		favorites/
			components/
			pages/
			hooks/
	lib/
		env/
		errors/
		http/
	shared/
		constants/
		pages/
		types/
		utils/
```

### Design decisions

- API access is isolated behind services and mappers.
- Server state is handled by TanStack Query.
- Favorites use a small persisted Zustand store.
- The app falls back to mock data when no remote API is configured.
- UI feedback states are reusable and centralized.

## Environment Variables

Create a local `.env` file from `.env.example`.

| Variable | Purpose |
| --- | --- |
| `VITE_AVENGERS_API_MODE` | Selects `mock` or `remote` mode. |
| `VITE_AVENGERS_API_BASE_URL` | Base URL for a remote Avengers API when enabled. |

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run test:watch
npm run typecheck
```

## Setup

```bash
npm install
npm run dev
```

Open the local Vite URL printed in the terminal.

## Testing

The current test suite covers data normalization in the Avengers mapper. The project is structured to expand coverage toward hooks, UI states, and integration flows.

## Future Improvements

- Add full API integration with a documented backend contract.
- Expand test coverage for pages, hooks, and user flows.
- Add pagination or infinite scroll when the API supports it.
- Introduce richer image fallbacks for missing character artwork.
- Add CI checks for lint, typecheck, tests, and build.