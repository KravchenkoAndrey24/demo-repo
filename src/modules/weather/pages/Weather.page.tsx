import { WeatherHeader } from '../components/WeatherHeader';
import { WeatherWidget } from '../components/WeatherWidget';
import { useGetCityNameQueryParam, useGetCityWeatherData } from '../../../domain/weather/weather.api.hook';
import { Loader, PageTitle } from '../../../components';

export const WeatherPage: React.FC = () => {
  const [q] = useGetCityNameQueryParam();

  const { data: weather, isPending, error } = useGetCityWeatherData(q);

  const isShowErrorMessage = error && !weather;
  const isShowLoader = isPending && !weather;

  return (
    <div className="m-4 mx-6">
      <PageTitle title="This is the weather page" />
      <div className="mt-6 flex flex-col items-center justify-center gap-6 lg:mt-12">
        <div className="w-full overflow-hidden rounded-xl bg-gray-200 sm:w-auto">
          <WeatherHeader isPending={isPending} />
          {q && weather && <WeatherWidget weather={weather} />}
        </div>
        {isShowLoader && <Loader />}
        {isShowErrorMessage && <div className="font-xxl font-semibold text-red-500">Enter a valid city name</div>}
      </div>
    </div>
  );
};
