import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './head.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Moment from 'react-moment';
import Today from '../today/Today';
import Weekly from '../weekly/Weekly';


const Header =() => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('')
  const [cnt, setCnt] = useState('4')
  const [lon, setLon] = useState('');
  const [lat, setLat] = useState('');
  const url1= `https://api.openweathermap.org/data/2.5/forecast/daily/?lat=${lat}&lon=${lon}&appid=e32f270d40e5509cf97512164550a894&units=metric&cnt=${cnt}`
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
        <Today data={data}/>
        <div className='scroll'><Weekly data={data} cnt={cnt} handleDaysChange={handleDaysChange}/></div>
      </div>
    </> 
  )
}
export default Header