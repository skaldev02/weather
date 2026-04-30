import { Cloud, Droplets, Wind, MapPin } from 'lucide-react';
import { City } from '../data/cities';
import { WeatherData } from '../services/weatherService';

interface WeatherCardProps {
  city: City;
  weather: WeatherData;
}

export const WeatherCard = ({ city, weather }: WeatherCardProps) => {
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return '☀️';
    if (code === 2 || code === 3) return '⛅';
    if (code >= 51 && code <= 65) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 95) return '⛈️';
    return '☁️';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <div className="flex items-center gap-2 text-slate-600 mb-6">
        <MapPin size={20} />
        <h2 className="text-2xl font-semibold text-slate-800">
          {city.name}, {city.country}
        </h2>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-bold text-slate-800">
            {weather.temperature}°
          </div>
          <div className="text-slate-500 mt-2 text-lg">{weather.description}</div>
        </div>
        <div className="text-7xl">{getWeatherIcon(weather.weatherCode)}</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Cloud className="mx-auto mb-2 text-slate-600" size={24} />
          <div className="text-sm text-slate-500">Weather</div>
          <div className="text-lg font-semibold text-slate-800">
            {weather.weatherCode}
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Wind className="mx-auto mb-2 text-slate-600" size={24} />
          <div className="text-sm text-slate-500">Wind</div>
          <div className="text-lg font-semibold text-slate-800">
            {weather.windSpeed} km/h
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Droplets className="mx-auto mb-2 text-slate-600" size={24} />
          <div className="text-sm text-slate-500">Humidity</div>
          <div className="text-lg font-semibold text-slate-800">
            {weather.humidity}%
          </div>
        </div>
      </div>
    </div>
  );
};
