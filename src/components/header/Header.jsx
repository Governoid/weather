import React, {useState} from 'react';
import axios from 'axios';
import './head.css'
import {faTemperatureHalf} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
function Header(){
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=f39fe8fadd1b0c5f8d671ecacb583261&units=metric`
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
          type="text"/>
        </div>
        <div className='tops'>
          {data &&
          (<div>
            {data && data.list.map((item,index) => {
              if (index < 1) {
                return <div className='flex' key={index}>
                        <h1>{data.city.name}</h1>
                        <div className='image'>
                          <img key={index}
                           src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                           alt="weather"
                           className='weather-icon'/>
                      </div>
                      <div className='bold temp'>
                        <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                        {item.main ? <p>{item.main.temp.toFixed()}°C</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
                        {item.wind ? <p key={index} className='bold'>{item.wind.speed.toFixed()} KPH</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
                        {item.main ? <p key={index} className='bold'>{item.main.humidity}%</p> : null}
                      </div>
                      <div className='bold temp'>
                        <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                        {item.main ? <p key={index} className='bold'>{item.main.feels_like.toFixed()}°C</p> : null}
                      </div>
                      </div>
              }
            })}
          </div>)
          }
        </div>
        {data &&  data.list.map((item,index) => {
          return <div key={index} className='forecast'>
                    <div className='image'>
                      <img key={index}
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/>
                    </div>
                    <div className='bold temp'>
                      <h4>Temperature<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                      {item.main ? <p>{item.main.temp}°C</p> : null}
                    </div>
                    <div className='bold temp'>
                      <h4>Wind speed<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-wind"/></h4>
                      {item.wind ? <p key={index} className='bold'>{item.wind.speed.toFixed()} KPH</p> : null}
                  </div>
                  <div className='bold temp'>
                    <h4>Humidity<FontAwesomeIcon className='fa-solid' icon="fa-solid fa-droplet"/></h4>
                    {item.main ? <p key={index} className='bold'>{item.main.humidity}%</p> : null}
                  </div>
                  <div className='bold temp'>
                    <h4>Feels like<FontAwesomeIcon className='fa-solid' icon={faTemperatureHalf}/></h4>
                    {item.main ? <p key={index} className='bold'>{item.main.feels_like.toFixed()}°C</p> : null}
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