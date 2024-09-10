'use client'

import { useState, useEffect } from 'react';
import { handleFetchWeather } from '../api/weatherAPI';
import Header from '@/components/Header';
import Content from '@/components/Content';

export default function Home() {
  const [city, setCity] = useState<string>('New Delhi');
  const [weather, setWeather] = useState<any>(null);  
  const [error, setError] = useState<string>('');
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);
  const [tomorrow, setTomorrow] = useState(false)

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const result = await handleFetchWeather(city);
        if (result) {
          setWeather(result);
        } else {
          throw new Error('No weather data available.');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch initial weather data.');
      }
    };

    fetchInitialWeather();
  }, []); 

  const handleFetch = async () => {
    if (!city) return;

    try {
      const weatherData = await handleFetchWeather(city);
      if (!weatherData) {
        throw new Error('No weather data available for this city.');
      }
      setWeather(weatherData); 
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    }
  };

  return (
    <div className="bg-[#252323] flex flex-col items-center p-2 text-white w-screen h-screen">
      <div className='flex flex-col lg:w-1/2'>
      <Header 
        isFahrenheit={isFahrenheit} 
        setIsFahrenheit={setIsFahrenheit} 
        city={city}
        setCity={setCity}
        handleFetch={handleFetch}
        tomorrow={tomorrow}
        setTomorrow={setTomorrow}
      />
      <Content weather={weather} isFahrenheit={isFahrenheit} city={city} isTomorrow={tomorrow} />

      {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
