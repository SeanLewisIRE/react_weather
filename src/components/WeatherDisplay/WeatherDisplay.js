import React from 'react';
import './WeatherDisplay.css'

const WeatherDisplay = (props) => {
    return (
        <div className="weather-container">
            <h1>{`${(props.temp- 273.15).toFixed(0)}°C`}</h1>
            <h2>{props.location}</h2>
            <h4>{props.weather_main}</h4>
            <h4>{props.weather_desc}</h4>
            <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}></img>
        </div>
    )
    
}

export default WeatherDisplay;