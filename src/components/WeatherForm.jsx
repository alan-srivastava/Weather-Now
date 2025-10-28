import React, { useState, useEffect } from 'react';
import '../styles/styles.css';

const WeatherForm = ({ onSearch }) => {
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (city.trim().length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=5`
                );
                const data = await response.json();
                if (data.results) {
                    setSuggestions(data.results.map(place => ({
                        name: place.name,
                        country: place.country,
                        admin1: place.admin1
                    })));
                } else {
                    setSuggestions([]);
                }
            } catch (err) {
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [city]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }
        setError('');
        onSearch(city);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        const cityName = `${suggestion.name}, ${suggestion.country}`;
        setCity(cityName);
        onSearch(suggestion.name);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="weather-form-container">
            <form onSubmit={handleSubmit} className="weather-form">
                <div className="input-container">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Enter city name..."
                        className="city-input"
                        autoComplete="off"
                    />
                    {loading && <div className="loading-spinner"></div>}
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="suggestions-list">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.name}
                                    <span className="suggestion-detail">
                                        {suggestion.admin1 ? `${suggestion.admin1}, ` : ''}{suggestion.country}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit" className="search-button">
                    Get Weather
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default WeatherForm;
