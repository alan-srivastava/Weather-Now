import React, { useState } from 'react';
import './styles/styles.css';
import WeatherCard from './components/WeatherCard';
import WeatherForm from './components/WeatherForm';
import { getCoordinates, getWeatherData } from './utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError('');
      
      // Get coordinates for the city
      const coords = await getCoordinates(city);
      setLocation(`${coords.name}, ${coords.country}`);
      
      // Get weather data using coordinates
      const weather = await getWeatherData(coords.lat, coords.lon);
      setWeatherData(weather);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setLocation('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Weather Now</h1>
      <WeatherForm onSearch={handleSearch} />
      {loading && <p>Loading weather data...</p>}
      {error && <p className="error-message">{error}</p>}
      {weatherData && <WeatherCard weatherData={weatherData} location={location} />}
    </div>
  );
}

export default App;