import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './head.css'
import {faTemperatureHalf} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Moment from 'react-moment';


function Header(){
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('')
  const [cnt, setCnt] = useState('3')
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
        <select className='select' onChange={handleDaysChange}
                 value={cnt}>
          <option value="3">3 Days</option>
          <option value="6">6 Days</option>
          <option value="9">9 Days</option>
        </select>
        <div className='tops'>
          {data &&
          (<div>
            {data && data.list.map((item,index) => {
              if (index < 1) {

                return <div className='flex' key={index}>
                        <h1>{data.city.name} today </h1>
                        <div className='image'>
                          <img key={index}
                           src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                           alt="weather"
                           className='weather-icon'/>
                      </div>
                      <div className='bold temp'>
                        <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                        {item.temp ? <p>{item.temp.day.toFixed()}°C</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
                        {item.speed ? <p key={index} className='bold'>{item.speed.toFixed()} KPH</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
                        {item.humidity ? <p key={index} className='bold'>{item.humidity}%</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                        {item.feels_like ? <p key={index} className='bold'>{item.feels_like.day.toFixed()}°C</p> : null}
                      </div>
                      </div>
              }
            })}
          </div>)
          }
        </div>
        
        {data &&  data.list.map((item,index) => {
          
          return <div key={index} className='forecast'>
                    <h1 className='brah'><Moment format='ddd'>{item.dt * 1000}</Moment></h1>
                    <div className='image'>
                      <img key={index}
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
                    </div>
                    <div className='bold temp'>
                      <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                      {item.temp ? <p>{item.temp.day.toFixed()}°C</p> : null}
                    </div>
                    <div className='bold temp'>
                      <h4 >Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
                      {item.speed ? <p key={index} className='bold'>{item.speed.toFixed()} KPH</p> : null}
                  </div>
                  <div className='bold temp'>
                    <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
                    {item.humidity ? <p key={index} className='bold'>{item.humidity}%</p> : null}
                  </div>
                  <div className='bold temp'>
                    <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                    {item.feels_like ? <p key={index} className='bold'>{item.feels_like.day.toFixed()}°C</p> : null}
                  </div>
                  </div>
        })
        }
      </div>
    </> 
      // {data.length &&
      
      // }
    // {data.list.map((item)=> (
    //   <h2></h2>
    // ))}
    // <div className='header'>
    //     <div className='top'>
    //         <h1>Weather App react</h1>
    //     </div>

    //     <div className="tops">
    //     {data && 
    //     (<div className='flex'>
    //         <h1>{data.name}</h1>
    //         <div className='image'>
    //           <img 
    //             src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
    //             alt="weather"
    //             className='weather-icon'/>
    //           </div>
    //           <div className='bold temp'>
    //           <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
    //           {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
    //           </div>
    //           <div className='bold'>
    //             <h4>Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
    //             {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KPH</p> : null}
    //           </div>
    //           <div className='bold'>
    //             <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
    //           {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
    //           </div>
    //           <div className='bold'>
    //             <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
    //             {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
    //           </div>
    //       </div>)
    //     }{data && 
    //       (<div className='forecast'>
    //         <h1>Forecast</h1>
    //       </div>)
    //     }
        
    //     </div>
    // </div>
  )
}

export default Header