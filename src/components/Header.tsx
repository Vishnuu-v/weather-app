'use client'

import { useState, useEffect } from "react";
import { FaSearch } from 'react-icons/fa';
import Switch from '@mui/material/Switch';

interface HeaderProps {
  isFahrenheit: boolean;
  setIsFahrenheit: (value: boolean) => void;
  city: string;
  setCity: (city: string) => void;
  tomorrow: boolean;
  setTomorrow: (tomorrow: boolean) => void;
  handleFetch: () => void;
}

export default function Header({
  isFahrenheit,
  setIsFahrenheit,
  city,
  setCity,
  handleFetch,
  tomorrow,
  setTomorrow
}: HeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleUnit = () => {
    setIsFahrenheit(!isFahrenheit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFetch();
    }
  };

  return (
    <header className="flex flex-col w-full">
      <div className="flex items-end justify-between ">
        <div className="text-3xl">
          <div className="lg:ml-[10%]">☀️</div>
          <h1 className="ml-[20%]">WeatherMe</h1>
        </div>
        <nav className="space-x-4">
          <a href="#today" className={!tomorrow ? 'underline' : ''} onClick={() => setTomorrow(false)} >Today</a>
          <a href="#tomorrow" className={tomorrow ? 'underline' : ''} onClick={() => setTomorrow(true)}>Tomorrow</a>
          <a href="#monthly">Monthly Forecast</a>
        </nav>
      </div>

      <div className="flex flex-col  items-center">
        <div className="flex flex-col items-center">
          <div className=" mt-4">{currentTime}</div>
          <div className="flex items-center mt-4">
            <span>°C</span>
            <Switch
              checked={isFahrenheit}
              onChange={toggleUnit}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>°F</span>
          </div>
        </div>
        <div className="relative w-2/3 mt-4  mx-auto text-black">
          <input
            type="text"
            placeholder="Search city..."
            value={city}
            className="w-full p-2 pl-10 pr-4 rounded border border-gray-300"
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </header>
  );
}
