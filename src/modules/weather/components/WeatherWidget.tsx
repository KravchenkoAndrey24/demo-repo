import { WeatherOutDto } from '../../../domain/weather/weather.api.type';
import { TYPED_ENV } from '../../../utils/env';
import { getFriendlyNewDate, getWindDirection } from '../../../utils/utils';
import { RenderInfoItem } from './RenderInfoItem';

export const WeatherWidget: React.FC<{ weather?: WeatherOutDto | null }> = ({ weather }) => {
  return (
    <div className="flex flex-col items-center gap-4 bg-gray-200 p-4">
      {weather?.icon && (
        <div className="h-[100px] w-[100px]">
          <img
            alt="Weather icon"
            className="h-full w-full object-contain"
            src={`${TYPED_ENV.VITE_OPEN_WEATHER_API_BASE_URL}/img/w/${weather?.icon}.png`}
          />
        </div>
      )}
      {weather?.temp && <div className="text-4xl font-bold">{weather.temp}&deg;C</div>}
      <div className="flex w-full flex-col gap-1 text-l font-medium">
        <RenderInfoItem title="Wind:">
          {weather?.windSpeed && <span>{weather.windSpeed} m/s,</span>}
          {weather?.windDirection && <span> {getWindDirection(weather?.windDirection)}</span>}
        </RenderInfoItem>
        <RenderInfoItem title="Pressure:">{weather?.pressure && <span>{weather.pressure} hPa</span>}</RenderInfoItem>
        <RenderInfoItem title="Humidity:">{weather?.humidity && <span>{weather.humidity}%</span>}</RenderInfoItem>
        <div className="text-gray-600">As of {getFriendlyNewDate()}</div>
      </div>
    </div>
  );
};
