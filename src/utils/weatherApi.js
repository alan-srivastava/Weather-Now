// Function to get coordinates for a city using Geocoding API
export const getCoordinates = async (city) => {
	try {
		const response = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
		);
		const data = await response.json();
    
		if (!data.results || data.results.length === 0) {
			throw new Error('City not found');
		}
    
		return {
			lat: data.results[0].latitude,
			lon: data.results[0].longitude,
			name: data.results[0].name,
			country: data.results[0].country
		};
	} catch (error) {
		throw new Error('Failed to get location data');
	}
};

// Function to get weather data using coordinates
export const getWeatherData = async (lat, lon) => {
	try {
		// Request current weather, hourly humidity/precipitation and daily sunrise/sunset
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,precipitation&daily=sunrise,sunset&timezone=auto`;
		const response = await fetch(url);
		const data = await response.json();

		if (!data || !data.current_weather) {
			throw new Error('Weather data not available');
		}

		const current = data.current_weather;

		// Find index for the current time in hourly arrays to get humidity/precipitation
		let humidity = null;
		let precipitation = null;
		if (data.hourly && data.hourly.time) {
			const idx = data.hourly.time.indexOf(current.time);
			if (idx !== -1) {
				humidity = data.hourly.relativehumidity_2m ? data.hourly.relativehumidity_2m[idx] : null;
				precipitation = data.hourly.precipitation ? data.hourly.precipitation[idx] : null;
			}
		}

		// Daily sunrise/sunset (first day)
		const sunrise = data.daily && data.daily.sunrise ? data.daily.sunrise[0] : null;
		const sunset = data.daily && data.daily.sunset ? data.daily.sunset[0] : null;

		const condition = getWeatherCondition(current.weathercode);

		return {
			temperature: Math.round(current.temperature),
			humidity,
			precipitation,
			windSpeed: current.windspeed,
			windDirection: current.winddirection,
			condition,
			time: current.time,
			sunrise,
			sunset
		};
	} catch (error) {
		throw new Error('Failed to get weather data');
	}
};

// Function to convert weather codes to readable conditions
const getWeatherCondition = (code) => {
	const conditions = {
		0: 'Clear sky',
		1: 'Mainly clear',
		2: 'Partly cloudy',
		3: 'Overcast',
		45: 'Fog',
		48: 'Depositing rime fog',
		51: 'Light drizzle',
		53: 'Moderate drizzle',
		55: 'Dense drizzle',
		56: 'Light freezing drizzle',
		57: 'Dense freezing drizzle',
		61: 'Slight rain',
		63: 'Moderate rain',
		65: 'Heavy rain',
		66: 'Light freezing rain',
		67: 'Heavy freezing rain',
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
		99: 'Thunderstorm with heavy hail'
	};
	return conditions[code] || 'Unknown';
};
