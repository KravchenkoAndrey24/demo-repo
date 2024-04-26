import { TYPED_ENV } from '../utils/env';
import { ApiService } from './api.service';

export const apiService = new ApiService();

export const apiWeatherService = new ApiService({ baseURL: TYPED_ENV.VITE_OPEN_WEATHER_API_BASE_URL });
