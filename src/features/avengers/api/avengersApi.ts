import { createHttpClient } from '../../../lib/http/httpClient';
import { marvelClient } from '../../../lib/http/marvelClient';
import { isRemoteMode, hasMarvelCredentials, appEnv } from '../../../lib/env/env';
import { avengerMocks } from '../mock/avengers';
import type { AvengerDto } from '../types/avenger';
import { mapMarvelCharacterToAvengerDto } from '../mappers/avengerMapper';

const client = appEnv.VITE_AVENGERS_API_BASE_URL
  ? createHttpClient({ baseUrl: appEnv.VITE_AVENGERS_API_BASE_URL })
  : null;

function filterAvengers(collection: AvengerDto[], search = '', team = 'all', status = 'all') {
  const normalizedSearch = search.trim().toLowerCase();

  return collection.filter((avenger) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      [avenger.name, avenger.alias, avenger.biography, avenger.role]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(normalizedSearch));

    const matchesTeam = team === 'all' || avenger.team === team;
    const matchesStatus = status === 'all' || avenger.status === status;

    return matchesSearch && matchesTeam && matchesStatus;
  });
}

function coerceDto(record: Record<string, unknown>): AvengerDto {
  const powers = Array.isArray(record.powers) ? record.powers.filter((power) => typeof power === 'string') : [];

  return {
    id: String(record.id ?? record.slug ?? record.name ?? crypto.randomUUID()),
    name: String(record.name ?? record.fullName ?? record.alias ?? 'Unknown Avenger'),
    alias: typeof record.alias === 'string' ? record.alias : typeof record.superhero === 'string' ? record.superhero : undefined,
    team: typeof record.team === 'string' ? record.team : typeof record.affiliation === 'string' ? record.affiliation : undefined,
    role: typeof record.role === 'string' ? record.role : typeof record.title === 'string' ? record.title : undefined,
    universe: typeof record.universe === 'string' ? record.universe : undefined,
    firstAppearance: typeof record.firstAppearance === 'string' ? record.firstAppearance : undefined,
    biography: typeof record.biography === 'string' ? record.biography : typeof record.description === 'string' ? record.description : undefined,
    imageUrl: typeof record.imageUrl === 'string' ? record.imageUrl : typeof record.image === 'string' ? record.image : undefined,
    powers,
    status: typeof record.status === 'string' ? record.status : undefined,
  };
}

async function fetchFromMarvel(search?: string): Promise<AvengerDto[]> {
  if (!hasMarvelCredentials()) {
    return [];
  }

  try {
    const response = search
      ? await marvelClient.getCharacters({ nameStartsWith: search, limit: 50 })
      : await marvelClient.getAvengersCharacters(50, 0);

    return response.data.results.map(mapMarvelCharacterToAvengerDto);
  } catch {
    return [];
  }
}

async function readRemoteCollection(): Promise<AvengerDto[]> {
  if (hasMarvelCredentials()) {
    const marvelData = await fetchFromMarvel();
    if (marvelData.length > 0) {
      return marvelData;
    }
  }

  if (client && isRemoteMode()) {
    const response = await client.requestJson<unknown>('/avengers');

    if (Array.isArray(response)) {
      return response.map((item) => coerceDto(item as Record<string, unknown>));
    }

    if (response && typeof response === 'object') {
      const container = response as Record<string, unknown>;
      const nested = container.data ?? container.results ?? container.items ?? container.avengers;

      if (Array.isArray(nested)) {
        return nested.map((item) => coerceDto(item as Record<string, unknown>));
      }
    }
  }

  return avengerMocks;
}

export interface AvengersQueryParams {
  search?: string;
  team?: string;
  status?: string;
}

export async function getAvengers(params: AvengersQueryParams = {}) {
  const collection = await readRemoteCollection();
  return filterAvengers(collection, params.search, params.team, params.status);
}

export async function getAvengerById(id: string) {
  if (hasMarvelCredentials()) {
    try {
      const numericId = parseInt(id, 10);
      if (!Number.isNaN(numericId)) {
        const response = await marvelClient.getCharacterById(numericId);
        if (response.data.results.length > 0) {
          return mapMarvelCharacterToAvengerDto(response.data.results[0]);
        }
      }
    } catch {
      // Fallback to local collection
    }
  }

  const collection = await readRemoteCollection();
  return collection.find((item) => item.id === id) ?? null;
}
