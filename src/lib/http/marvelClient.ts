import { md5 } from './md5';
import { appEnv, hasMarvelCredentials } from '../env/env';

const MARVEL_BASE_URL = 'https://gateway.marvel.com/v1/public';

function generateMarvelAuthParams() {
  const timestamp = Date.now().toString();
  const publicKey = appEnv.VITE_MARVEL_PUBLIC_API_KEY ?? '';
  const privateKey = appEnv.VITE_MARVEL_PRIVATE_API_KEY ?? '';

  const hash = md5(timestamp + privateKey + publicKey);

  return {
    ts: timestamp,
    apikey: publicKey,
    hash,
  };
}

function buildUrl(path: string, params: Record<string, string | number> = {}) {
  const auth = generateMarvelAuthParams();
  const searchParams = new URLSearchParams({
    ...auth,
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });

  return `${MARVEL_BASE_URL}${path}?${searchParams}`;
}

export interface MarvelResponse<T> {
  code: number;
  status: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: string;
    url: string;
  }[];
  comics: {
    available: number;
  };
  series: {
    available: number;
  };
  stories: {
    available: number;
  };
}

export interface MarvelComic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  characters: {
    available: number;
    items: {
      resourceURI: string;
      name: string;
    }[];
  };
}

async function fetchMarvel<T>(path: string, params: Record<string, string | number> = {}): Promise<T> {
  if (!hasMarvelCredentials()) {
    throw new Error('Marvel API credentials not configured');
  }

  const url = buildUrl(path, params);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Marvel API error: ${response.status}`);
  }

  return response.json();
}

export const marvelClient = {
  getCharacters: async (params?: {
    nameStartsWith?: string;
    limit?: number;
    offset?: number;
  }): Promise<MarvelResponse<MarvelCharacter>> => {
    return fetchMarvel('/characters', {
      limit: params?.limit ?? 20,
      offset: params?.offset ?? 0,
      ...(params?.nameStartsWith && { nameStartsWith: params.nameStartsWith }),
    });
  },

  getCharacterById: async (id: number): Promise<MarvelResponse<MarvelCharacter>> => {
    return fetchMarvel(`/characters/${id}`);
  },

  getAvengersCharacters: async (limit = 20, offset = 0): Promise<MarvelResponse<MarvelCharacter>> => {
    return fetchMarvel('/characters', {
      limit,
      offset,
      series: 'Avengers',
    });
  },

  getCharacterComics: async (characterId: number, limit = 10): Promise<MarvelResponse<MarvelComic>> => {
    return fetchMarvel(`/characters/${characterId}/comics`, { limit });
  },
};