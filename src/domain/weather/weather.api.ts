import { apiWeatherService } from '../../services';
import { WeatherApiOutDto } from './weather.api.type';

export const weatherAPI = {
  getWeatherInfo: async (q?: string) => {
    return apiWeatherService.get<WeatherApiOutDto>('/data/2.5/weather', {
      params: { q, units: 'metric' }
    });
  }
};
