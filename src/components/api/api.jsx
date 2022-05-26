import axios from "axios"

function getForecast(lat,lon) {
    return axios.get (
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=f39fe8fadd1b0c5f8d671ecacb583261`
    )
  }
function getCurrentWeather(location) {
    return axios.get (
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f39fe8fadd1b0c5f8d671ecacb583261`
    )
}
  export  {getForecast, getCurrentWeather}