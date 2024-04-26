export type CityFormType = {
  q?: string;
};

export type WeatherApiOutDto = {
  weather?: Array<{
    description?: string;
    icon?: string;
    id: number;
    main?: string;
  }>;
  main?: {
    temp?: number;
    pressure?: number;
    humidity?: number;
  };
  wind?: {
    speed?: number;
    deg?: number;
  };
};

export type WeatherOutDto = {
  icon?: string;
  temp?: number;
  windSpeed?: number;
  windDirection?: number;
  pressure?: number;
  humidity?: number;
};
