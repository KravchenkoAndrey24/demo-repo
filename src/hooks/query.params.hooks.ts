import { StringParam, useQueryParam, withDefault } from 'use-query-params';

export const useGetCityNameQueryParam = () => {
  return useQueryParam('q', withDefault(StringParam, ''));
};
