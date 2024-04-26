import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { Input } from '../../../components';
import { CityFormType } from '../../../domain/weather/weather.api.type';
import { useGetCityNameQueryParam } from '../../../domain/weather/weather.api.hook';

export const WeatherHeader: React.FC<{ isPending?: boolean }> = ({ isPending }) => {
  const [cityName, setCityName] = useGetCityNameQueryParam();

  const { register, handleSubmit, watch } = useForm<CityFormType>({
    defaultValues: { q: cityName },
    resolver: yupResolver(object({ q: string() }))
  });

  const { q } = watch();
  const sumbitForm = (formData: CityFormType) => {
    setCityName(formData?.q?.trim() || '');
  };

  return (
    <form onSubmit={handleSubmit(sumbitForm)} className="flex gap-4 bg-[#017BFE] px-4 py-2">
      <Input
        {...register('q')}
        placeholder="City name"
        className="col-span-3 flex-1 bg-white"
        size="small"
        classes={{
          root: 'rounded'
        }}
        fullWidth
      />
      <Button
        className="h-full bg-[#0156B3] text-white shadow-none disabled:bg-blue-900"
        disabled={isPending || !q}
        variant="contained"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
};
