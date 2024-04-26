import { UserOutDto } from '../domain/auth/auth.api.type';
import { WeatherOutDto } from '../domain/weather/weather.api.type';

export const GET_CURRENT_USER_QUERY = {
  name: 'get-currenr-user'
} as const;
export type GET_CURRENT_USER_QUERY = typeof GET_CURRENT_USER_QUERY & { schema: UserOutDto };

export const GET_WEATHER_QUERY = {
  name: 'get-weather'
} as const;
export type GET_WEATHER_QUERY = typeof GET_WEATHER_QUERY & { schema: WeatherOutDto };
