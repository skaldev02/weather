export interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  description: string;
}

const weatherCodeDescriptions: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

export const fetchWeather = async (
  latitude: number,
  longitude: number,
  cityName?: string,
  countryName?: string
): Promise<WeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius&wind_speed_unit=kmh`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  const current = data.current;

  const weatherData: WeatherData = {
    temperature: Math.round(current.temperature_2m),
    weatherCode: current.weather_code,
    windSpeed: Math.round(current.wind_speed_10m),
    humidity: current.relative_humidity_2m,
    description: weatherCodeDescriptions[current.weather_code] || 'Unknown',
  };

  if (cityName) {
    const { supabase } = await import('../lib/supabase');
    await supabase.from('weather_logs').insert({
      city: cityName,
      country: countryName ?? '',
      temperature: weatherData.temperature,
      description: weatherData.description,
      fetched_at: new Date().toISOString(),
    });
  }

  return weatherData;
};
