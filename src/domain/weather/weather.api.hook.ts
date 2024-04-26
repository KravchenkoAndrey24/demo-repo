import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { WeatherOutDto } from './weather.api.type';
import { weatherAPI } from './weather.api';
import { StringParam, useQueryParam, withDefault } from 'use-query-params';
import { GET_WEATHER_QUERY } from '../../constants/query-api-configs';

export const useGetCityNameQueryParam = () => {
  return useQueryParam('q', withDefault(StringParam, ''));
};

export const useGetCityWeatherData = (
  q: string,
  options?: UseQueryOptions<unknown, Error, WeatherOutDto | null, (typeof GET_WEATHER_QUERY.name | string)[]>
) => {
  return useQuery({
    queryKey: [GET_WEATHER_QUERY.name, q],
    queryFn: async () => {
      if (!q) {
        return null;
      }

      const weatherData = await weatherAPI.getWeatherInfo(q);

      return {
        icon: (weatherData.weather && weatherData.weather[0]?.icon) || '',
        temp: weatherData.main?.temp,
        windSpeed: weatherData.wind?.speed,
        windDirection: weatherData.wind?.deg,
        pressure: weatherData.main?.pressure,
        humidity: weatherData.main?.humidity
      };
    },
    ...options
  });
};
