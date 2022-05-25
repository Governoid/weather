import React, {useState} from 'react';
import axios from 'axios';
import './head.css'
import {faTemperatureHalf} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
function Header(){
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('')
  const apiClient = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/",
  });
  const getForecast = (lat, lon) => {
    return apiClient
    .get(
      `/onecall?lat=${lat}&lon=${lon}&appid=f39fe8fadd1b0c5f8d671ecacb583261&units=metric`
    )
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f39fe8fadd1b0c5f8d671ecacb583261&units=metric`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  
  return (
    
    <div className='header'>
      
        <div className='top'>
            <h1>Weather App react</h1>
        </div>
        <div className='search'>
            <input
            value={location}
            onChange={event => setLocation(event.target.value)} 
            onKeyPress={searchLocation}
            type="text"/>
        </div>
        <div className="tops">
        {data && 
        (<div className='flex'>
            <h1>{data.name}</h1>
            <div className='image'>
              <img 
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather"
                className='weather-icon'/>
              </div>
              <div className='bold temp'>
              <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
              {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
              </div>
              <div className='bold'>
                <h4>Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KPH</p> : null}
              </div>
              <div className='bold'>
                <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              </div>
              <div className='bold'>
                <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              </div>
          </div>)
        }{data && 
          (<div className='forecast'>
            <h1>Forecast</h1>
          </div>)
        }
        
        </div>
    </div>
  )
}

export default Header