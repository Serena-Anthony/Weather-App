import config from './config';

import React, { useState } from "react";
import axios from "axios";
import "./App2.css";

function App2() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  // const apikey = "9b3527ef530943cc762c599ce943e3e9";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${config.apiKey}`;

      console.log(url);

      axios.get(url).then((response) => {
          setData(response.data);
          console.log(response, data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data: ", error);
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
       {/* <img className="logo" src="./assets/logo.png" alt="Weathery Logo" /> */}
      <div className="search">
       
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Search a City"
          type="text"
        />

      </div>

      {data.name && (
        <div className="container">
          <div className="left">
            <div className="top">
              <div className="location">
                <p>{data.name}</p>
                {data.sys && (
                  <p>
                    <strong>{data.sys.country}</strong>
                  </p>
                )}
              </div>

              <div className="temp">
                {data.main && <h1>{data.main.temp.toFixed()}°C</h1>}
              </div>

              <div className="description">
                {/* <span style={{ textTransform: "uppercase" }}>
                  {data.weather && <p>{data.weather[0].main}</p>}
                </span> */}
                {data.weather && <p>{data.weather[0].description}</p>}
                <br />
                {data.weather && (
                  <img
                    className="wicon"
                    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                    alt="weather icon"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="right">
            <div className="bottom">
              <div className="feels-like">
                {data.main && (
                  <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                )}
                <p>Feels Like</p>
              </div>

              <div className="humidity">
                {data.main && <p className="bold">{data.main.humidity}%</p>}
                <p>Humidity</p>
              </div>

              <div className="wind">
                {data.wind && (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                )}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App2;
