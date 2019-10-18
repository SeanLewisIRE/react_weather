import React from 'react';

const WeatherDisplay = (props) => {
    return (
        <div className="weather-container">
            <h1>{props.temp}</h1>
            <h2>{props.location}</h2>
            <h4>{props.weather_main}</h4>
            <h4>{props.weather_desc}</h4>
        </div>
    )
    
}

export default WeatherDisplay;