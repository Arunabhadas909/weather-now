
export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
  feels_like: number;
  humidity: number;
  pressure: number;
}


export interface HourlyWeather {
  time: string[];
  temperature: number[];
  feels_like: number[];
  humidity: number[];
  pressure: number[];
  windspeed: number[];
  weathercode: number[];
}


export interface DailyWeather {
  time: string[];
  temp_max: number[];
  temp_min: number[];
  weathercode: number[];
}

export interface WeatherResponse {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}
