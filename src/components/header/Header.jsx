import React, {useState} from 'react';
import axios from 'axios';
import './head.css'
function Header(){
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=kaunas&appid=f39fe8fadd1b0c5f8d671ecacb583261&cnt=5&units=metric`

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
            pattern='.{5, 10}'
            minLength={3}
            value={location}
            onChange={event => setLocation(event.target.value)} 
            onKeyPress={searchLocation}
            type="text"/>
        </div>
        <div className="top">
          <div className="location">

          </div>
        </div>
    </div>
  )
}

export default Header