import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../../../shared/constants/queryKeys';
import { getAvengerDetails } from '../services/avengersService';
import type { Avenger } from '../types/avenger';

export function useAvengerDetailsQuery(id?: string) {
  return useQuery<Avenger | null>({
    queryKey: [QUERY_KEYS.avenger, id],
    queryFn: () => getAvengerDetails(id ?? ''),
    enabled: Boolean(id),
  });
}
