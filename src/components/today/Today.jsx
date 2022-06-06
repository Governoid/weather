import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
const Today = (props) => {

    return (
        <div>{props.data &&
            (<div>
              {props.data && props.data.list.map((item,index) => {
                if (index < 1) {
  
                  return <div className='today' key={index}>
                          <div className='today_inner'>
                            <div className='today_left'>
                              <h1>
                                {props.data.city.name} ({props.data.city.country})
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
            }</div>
    );
};
export default Today