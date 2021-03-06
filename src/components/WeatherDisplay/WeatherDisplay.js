import React from 'react';
import './WeatherDisplay.css'

const WeatherDisplay = (props) => {
    
    const capatalise = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <div className="weather-container">
            <h1>{`${(props.temp- 273.15).toFixed(0)}°C`}</h1>
            <h2>{props.location}, {props.country}</h2>
            <h4>{props.weather_main} - {capatalise(props.weather_desc)}</h4>
            <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="Current weather icon"></img>
            <p>Photo: {props.credit} on <a href={props.creditLink} target="_blank" rel="noopener noreferrer">Unsplash</a> </p>
        </div>
    )
    
}
export default WeatherDisplay;