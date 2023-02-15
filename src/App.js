import React, { useState } from "react";
import Search from "./components/search/Search";
import CurrentWeatherComp from "./components/current-Weather/CurrentWeatherComp";
import "./App.css";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api/api";
import Forecast from "./components/forecast/Forecast";

const App = () => {
  const [CurrentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);

  const handleonSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([CurrentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Search onSearchChange={handleonSearchChange} />
      {CurrentWeather && <CurrentWeatherComp data={CurrentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
