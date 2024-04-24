import { CircularProgress } from '@mui/material';
import { WeatherHeader } from '../components/WeatherHeader';
import { WeatherWidget } from '../components/WeatherWidget';
import { useGetCityWeatherData } from '../../../hooks/react-query.hooks';
import { useGetCityNameQueryParam } from '../../../hooks/query.params.hooks';

export const WeatherPage: React.FC = () => {
  const [q] = useGetCityNameQueryParam();

  const { data: weather, isPending, error } = useGetCityWeatherData({ q });

  const isShowErrorMessage = error && !weather;
  const isShowLoader = isPending && !weather;

  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-6 pt-[100px]">
      <div className="w-full overflow-hidden rounded-xl bg-gray-200 sm:w-auto">
        <WeatherHeader isPending={isPending} />
        {q && weather && <WeatherWidget weather={weather} />}
      </div>
      {isShowLoader && <CircularProgress />}
      {isShowErrorMessage && <div className="font-xxl font-semibold text-red-500">Enter a valid city name</div>}
    </div>
  );
};
