import { useState, useEffect } from 'react';
import { RefreshCw, Zap } from 'lucide-react';
import { City, getRandomCity } from './data/cities';
import { WeatherData, fetchWeather } from './services/weatherService';
import { WeatherCard } from './components/WeatherCard';

function App() {
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestCount, setRequestCount] = useState(0);

  const loadRandomCityWeather = async () => {
    setLoading(true);
    setError(null);

    try {
      const randomCity = getRandomCity();
      setCity(randomCity);

      const weatherData = await fetchWeather(
        randomCity.latitude,
        randomCity.longitude,
        randomCity.name,
        randomCity.country
      );
      setWeather(weatherData);
      setRequestCount((prev) => prev + 1);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomCityWeather();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Zap className="text-yellow-400" size={32} />
          <h1 className="text-4xl font-bold text-white">
            Weather Stress Tester
          </h1>
        </div>
        <p className="text-slate-300 text-lg">
          Random city weather data on demand
        </p>
        <div className="mt-4 inline-block bg-slate-700 rounded-full px-6 py-2">
          <span className="text-slate-300">Requests made: </span>
          <span className="text-yellow-400 font-semibold">{requestCount}</span>
        </div>
      </div>

      <button
        onClick={loadRandomCityWeather}
        disabled={loading}
        className="mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-3 text-lg"
      >
        <RefreshCw
          className={loading ? 'animate-spin' : ''}
          size={24}
        />
        {loading ? 'Loading...' : 'Get Random City Weather'}
      </button>

      {error && (
        <div className="mb-8 bg-red-500/10 border border-red-500 text-red-200 px-6 py-4 rounded-xl max-w-md">
          {error}
        </div>
      )}

      {city && weather && !loading && (
        <div className="animate-fade-in">
          <WeatherCard city={city} weather={weather} />
        </div>
      )}

      {!city && !loading && (
        <div className="text-slate-400 text-center max-w-md">
          <p className="text-lg">
            Click the button above to fetch weather data for a random city from
            around the world. Perfect for stress testing weather APIs!
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
