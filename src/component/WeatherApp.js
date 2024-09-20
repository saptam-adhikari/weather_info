import React, { useState } from 'react';
import './WeatherApp.css'; // External CSS file

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [mapSrc, setMapSrc] = useState('');

  const API_KEY = 'b1922b4687bfec416b777d1e446724e6'; // Replace with your API key

  const getData = async () => {
    if (!city) return;
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setMapSrc(`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
    } catch (err) {
      console.error(err);
    }
  };

  const getDataLocation = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setMapSrc(`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`);
    } catch (err) {
      console.error(err);
    }
  };

  const getWeather = () => {
    navigator.geolocation.getCurrentPosition(success);

    function success(position) {
      const { latitude, longitude } = position.coords;
      getDataLocation(latitude, longitude);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather Info</h1>

      <button onClick={getWeather}>Get Weather on Location</button>

      <div>
        <input
          type="text"
          id="city"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getData} id="submit">Submit</button>
      </div>

      <div id="container">
        {weatherData ? (
          <>
            <p>City: {weatherData.name}</p>
            <p>Min Temp: {Math.floor(weatherData.main.temp_min - 273)}°C</p>
            <p>Max Temp: {Math.floor(weatherData.main.temp_max - 273)}°C</p>
            <p>Current Temp: {Math.floor(weatherData.main.temp - 273)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            width="600"
            height="500"
            id="gmap_canvas"
            src={mapSrc}
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            title="map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
