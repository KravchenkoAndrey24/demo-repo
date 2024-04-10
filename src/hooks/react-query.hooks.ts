import { useQuery } from '@tanstack/react-query';
import { CityFormType, WeatherApiOutDto, WeatherOutDto } from '../types';
import { apiService } from '../services';

export const useGetCityWeatherData = ({ q }: CityFormType) => {
  return useQuery<WeatherOutDto | null>({
    queryKey: ['WEATHER', q],
    queryFn: async () => {
      if (!q) {
        return null;
      }

      const weatherData = await apiService.get<WeatherApiOutDto>('/data/2.5/weather', {
        params: { q, units: 'metric' }
      });

      return {
        icon: (weatherData.weather && weatherData.weather[0]?.icon) || '',
        temp: weatherData.main?.temp,
        windSpeed: weatherData.wind?.speed,
        windDirection: weatherData.wind?.deg,
        pressure: weatherData.main?.pressure,
        humidity: weatherData.main?.humidity
      };
    }
  });
};
