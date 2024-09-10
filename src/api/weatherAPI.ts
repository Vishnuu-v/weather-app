'use client'

import axios from "axios";

export const fetchCoordinates = async (city: string) => {
    try {
        const geoCodingApiKey = process.env.NEXT_PUBLIC_API_KEY;
        const georesponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoCodingApiKey}`
        );
        const { lat, lon } = georesponse.data[0];
        return { lat, lon };
    } catch (error) {
        console.error("Geocoding error:", error);
        return null;
    }
};

export const fetchWeather = async (lat: number, lon: number) => {
    try {
        const weatherApiKey = process.env.NEXT_PUBLIC_API_KEY;
        const weatherResponse = await axios.get(
            // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
        );
        return weatherResponse.data;
    } catch (error) {
        console.error("Weather API error:", error);
        return null;
    }
};

export const handleFetchWeather = async (city: string) => {
    const coordinates = await fetchCoordinates(city);
    if (coordinates) {
        const weatherData = await fetchWeather(coordinates.lat, coordinates.lon);
        return weatherData;
    }
    return null;
};
