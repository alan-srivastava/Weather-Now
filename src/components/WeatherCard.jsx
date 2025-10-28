import React from 'react';
import '../styles/styles.css';

const degreesToCardinal = (deg) => {
    if (deg == null) return 'N/A';
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round((deg % 360) / 22.5) % 16;
    return directions[index];
};

const formatTime = (isoString) => {
    try {
        const d = new Date(isoString);
        return d.toLocaleString();
    } catch (e) {
        return isoString;
    }
};

const WeatherCard = ({ weatherData, location }) => {
    if (!weatherData) return null;

    return (
        <div className="weather-card">
            <h2>{location}</h2>
            <div className="weather-info">
                <div className="temperature">
                    <span className="temp-value">{weatherData.temperature}</span>
                    <span className="temp-unit">°C</span>
                </div>

                <p className="condition">{weatherData.condition}</p>

                <div className="weather-details">
                    <div className="detail-block">
                        <strong>Humidity</strong>
                        <div>{weatherData.humidity != null ? `${weatherData.humidity}%` : 'N/A'}</div>
                    </div>
                    <div className="detail-block">
                        <strong>Precipitation</strong>
                        <div>{weatherData.precipitation != null ? `${weatherData.precipitation} mm` : 'N/A'}</div>
                    </div>
                    <div className="detail-block">
                        <strong>Wind</strong>
                        <div>{weatherData.windSpeed} km/h · {degreesToCardinal(weatherData.windDirection)}</div>
                    </div>
                </div>

                <div className="extra-info">
                    <p>Observed: {weatherData.time ? formatTime(weatherData.time) : 'N/A'}</p>
                    <p>Sunrise: {weatherData.sunrise ? formatTime(weatherData.sunrise) : 'N/A'}</p>
                    <p>Sunset: {weatherData.sunset ? formatTime(weatherData.sunset) : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;