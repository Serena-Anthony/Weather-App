import React, {useState} from 'react';
import axios from 'axios'
import './App.css';

function App() {
  const[data,setData] = useState({});
  const[location, setLocation] = useState('');
  const apikey = '9b3527ef530943cc762c599ce943e3e9';

  const searchLocation = (event) => {
    if (event.key === 'Enter')
      {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apikey}`;

        console.log(url);

        axios.get(url).then((response) =>{
          setData(response.data);
          console.log(response,data);
        }).catch((error) => {
          console.error("Error fetching the weather data: ", error);
        });
        setLocation('');
      }
    
  }

  return (
    <div className="app">

      <div className='search'>
        <input 
        value = {location}
        onChange = {event => setLocation(event.target.value)}
        onKeyDown = {searchLocation}
        placeholder='Search a City'
        type='text'
        />
      </div>
  
 
      <div className='container'>
         {data.name &&(  
          <div className='top'>
            <div className='location'>
              <p>{data.name}</p>
              {data.sys ?  <p><strong>{data.sys.country}</strong></p> : null}
            </div>

            <div className='temp'>
              {data.main && <h1><strong>{data.main.temp.toFixed()}°C</strong></h1>}
            </div>

            <div className='description'>
            <span style={{textTransform: 'uppercase'}}>
              {data.weather ? <h1>{data.weather[0].main} </h1> : null}
            </span>
              {data.weather ? <p>{data.weather[0].description}</p> : null}
              {data.weather ? <img className='wicon' src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="weather icon"/> : null}
            </div>
          </div>
         )}

      {data.name!== undefined &&

          <div className='bottom'>

            <div className='feels-like'>
              {data.main ?  <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p> Feels Like </p>
            </div>

            <div className='humidity'>
              {data.main ?  <p className='bold'>{data.main.humidity} % </p> : null}
              <p> Humidity </p>
            </div>

            <div className='wind'>
              {data.wind ?  <p className='bold'>{data.wind.speed.toFixed()} MPH </p> : null}
              <p> Wind speed</p>
            </div>

          </div>
      }
      </div>
    </div>
  );
}

export default App;
