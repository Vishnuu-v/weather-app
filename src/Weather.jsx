import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./weather.css"
const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(

                    `http://api.weatherapi.com/v1/current.json?key=e0853aa8b4a947be946111210230306&q=${location}&aqi=no`
                );
                setWeatherData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error finding weather data : ", error)
            }
        };

        if (location) {
            fetchData();
        }
    }, [location]);

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    return (
        <div className="container">

            <h2>Weather</h2>
            <input className="location-input" type="text" value={location} placeholder="Enter Location"
                onChange={handleLocationChange} />


            {
                weatherData && (
                    < div className="weather-data">
                        <p>{weatherData.location.localtime}</p>
                        <h3>{weatherData.location.name},{weatherData.location.region}</h3>
                        {<img className="icon" src={`https:${weatherData.current.condition.icon}`} />}
                        <p>{weatherData.current.temp_c + "°C"}</p>
                        <p className="condition">{weatherData.current.condition.text}</p>

                    </div>

                )
            }

        </div >
    )
}

export default Weather;