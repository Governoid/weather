import React from "react";
import Moment from "react-moment";

const Weekly = (props) => {
    return (
        <>
            {props.data && 
          <div className='weekly'>
            <div className='weekly_title'>
              Weekly<span> weather</span>
                <select className='select' onChange={props.handleDaysChange} value={props.cnt}>
                  <option value="4">3 Days</option>
                  <option value="7">6 Days</option>
                  <option value="10">9 Days</option>
                </select>
            </div>
          </div>
}
        {props.data &&  props.data.list.map((item,index) => {
          
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
        </>
    )
}
export default Weekly