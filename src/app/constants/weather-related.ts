export const REQUEST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export enum WeatherRequestParamsLiterals {
  Latitude = 'latitude',
  Longitude = 'longitude',
  Daily = 'daily',
  Timezone = 'timezone',
  StartDate = 'start_date',
  EndDate = 'end_date'
}

export enum WeatherRequestConstParams {
  Latitude = '61.47',
  Longitude = '34.20',
  Daily = 'temperature_2m_max',
  Timezone = 'Europe/Moscow'
}
