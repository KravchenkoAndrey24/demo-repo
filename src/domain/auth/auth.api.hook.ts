import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { UserOutDto } from './auth.api.type';
import { GET_CURRENT_USER_QUERY } from '../../constants/query-api-configs';
import { LOCAL_STORAGE_KEYS, getLocalStorageValue } from '../../utils/local-storage.utils';

export const useGetCurrentUser = (
  options?: UseQueryOptions<unknown, Error, UserOutDto | null, (typeof GET_CURRENT_USER_QUERY.name | null)[]>
) => {
  return useQuery({
    queryKey: [GET_CURRENT_USER_QUERY.name],
    queryFn: async () => {
      return getLocalStorageValue(LOCAL_STORAGE_KEYS.CURRENT_USER);
    },
    staleTime: Infinity,
    ...options
  });
};
