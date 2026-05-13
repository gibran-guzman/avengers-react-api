import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../shared/constants/queryKeys';
import { listAvengers } from '../services/avengersService';
import type { Avenger } from '../types/avenger';

export interface AvengersQueryParams {
  search?: string;
  team?: string;
  status?: string;
  enabled?: boolean;
}

export function useAvengersQuery(params: AvengersQueryParams) {
  return useQuery<Avenger[]>({
    queryKey: [QUERY_KEYS.avengers, params.search, params.team, params.status],
    queryFn: () => listAvengers(params),
    enabled: params.enabled ?? true,
  });
}
