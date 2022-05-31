import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './head.scss'
import {faTemperatureHalf} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Moment from 'react-moment';


function Header(){
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('')
  const [cnt, setCnt] = useState('4')
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const url1= `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=e32f270d40e5509cf97512164550a894&units=metric&cnt=${cnt}`
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&appid=e32f270d40e5509cf97512164550a894&units=metric&cnt=${cnt}`
 
  function success(pos) {
    setLat(pos.coords.latitude);
    setLon(pos.coords.longitude);

  }

 useEffect(() => {
  navigator.geolocation.getCurrentPosition(success);
 }, [])

 useEffect(() => {
   fetchData(url1);
 }, [lat, lon])

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchData(url);
    }
  }

  const fetchData = (custurl) => {
    if (location.length || lat) {
      axios.get(custurl).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
  }

  useEffect(() => {
    if (location) {
      fetchData(url);
    } else if (lat) {
      fetchData(url1);
    }
  }, [cnt])

  const handleDaysChange = (e) => {
    setCnt(e.target.value);
  }

  return (
    
    <>
      
      <div className='header'>
        <div className='top'>
          <h1>Weather App React</h1>
        </div>
        <div className='search'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Type city here'
          type="text"/>
        </div>
          {data &&
          (<div>
            {data && data.list.map((item,index) => {
              if (index < 1) {

                return <div className='today' key={index}>
                        <div className='today_inner'>
                          <div className='today_left'>
                            <h1>
                              {data.city.name} ({data.city.country})
                            </h1>
                            <h2>
                              <span>{item.temp.max.toFixed()}°C</span>
                              <span>{item.temp.min.toFixed()}°C</span>
                            </h2>
                            <div className='today_data'>
                              <div>
                                <span>W.Speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></span>
                                <span>
                                  {item.speed.toFixed()} KPH
                                </span>
                              </div>

                              <div>
                                <span>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></span>
                                <span>
                                  {item.humidity.toFixed()} %
                                </span>
                              </div>

                              <div>
                                <span>Sunrise<FontAwesomeIcon icon="fa-solid fa-sun" /></span>
                                <span>
                                <Moment format='LT'>{item.sunrise * 1000}</Moment>
                                </span>
                              </div>
                              <div>
                                <span>Sunset<FontAwesomeIcon icon="fa-solid fa-moon" /></span>
                                <span>
                                <Moment format='LT'>{item.sunset * 1000}</Moment>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className='today_right'>
                            <div className='today_icon'>
                              <div>
                                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                     alt="Weather icon"
                                     />
                              </div>
                            </div>
                            <h3>{item.weather[0].description}</h3>
                          </div>
                        </div>
                      </div>
              }
            })}
          </div>)
          }

          <div className='weekly'>
            <div className='weekly_title'>
              Weekly<span> weather</span>
                <select className='select' onChange={handleDaysChange} value={cnt}>
                  <option value="4">3 Days</option>
                  <option value="7">6 Days</option>
                  <option value="10">9 Days</option>
                </select>
            </div>
          </div>
        {data &&  data.list.map((item,index) => {
          
          if(index != 0) return (
            <div className='weekly_card' key={item.dt}>
              <div className='weekly_inner'>
                <div className='weekly_left'>
                  <div>
                    <h3>
                    <Moment format='dddd'>{item.dt * 1000}</Moment>
                    </h3>

                    <h4>
                      <span>{item.temp.max.toFixed(0)}°C</span>
                      <span>{item.temp.min.toFixed(0)}°C</span>
                    </h4>
                  </div>

                  <div className='weekly_data'>
                    <div>
                      <span>Sunrise</span>
                      <span>
                      <Moment format='LT'>{item.sunrise * 1000}</Moment>
                      </span>
                    </div>

                    <div>
                      <span>Sunset</span>
                      <span>
                      <Moment format='LT'>{item.sunset * 1000}</Moment>
                      </span>
                    </div>
                  </div>
                </div>

                <div className='weekly_right'>
                  <div className='weekly_icon'>
                    <div>
                      <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                           alt="Weather icon"
                      />
                    </div>
                  </div>

                  <h5>{item.weather[0].description}</h5>
                </div>
              </div>
            </div>
          )                 
        })
        }
      </div>
    </> 
  )
}

export default Header