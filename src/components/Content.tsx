import React from 'react';
import { FaMapMarkerAlt, FaThermometerHalf, FaCloud } from 'react-icons/fa';

interface WeatherItem {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  visibility: number;
  dt_txt: string;
}

interface WeatherResponse {
  list: WeatherItem[];
}

interface ContentProps {
  weather: WeatherResponse | null;
  isFahrenheit: boolean;
  city: string;
  isTomorrow: boolean;
}

interface TemperatureCardProps {
  temp: string;
  time: string;
}

interface WeatherCardProps {
  weather: WeatherResponse | null;
  city: string;
  isFahrenheit: boolean;
  isTomorrow: boolean;
}

const kelvinToCelsius = (kelvin: number): string => (kelvin - 273.15).toFixed(1);
const kelvinToFahrenheit = (kelvin: number): string => ((kelvin - 273.15) * 9/5 + 32).toFixed(1);

// Main Component
const Content: React.FC<ContentProps> = ({ weather, city, isFahrenheit, isTomorrow }) => {
  console.log(weather)
  return (
    <div className='flex flex-col w-full px-8 py-4'>
      <WeatherCard weather={weather} city={city} isFahrenheit={isFahrenheit} isTomorrow={isTomorrow} />
      <div className='flex flex-wrap justify-between mt-8 text-center gap-2'>
      {weather && weather.list
          .slice(
            isTomorrow ? 8 : 0,        
            isTomorrow ? 12 : 4         
          )
          .map((item, index) => {
            const kelvin = item.main.temp;
            const temp = isFahrenheit 
              ? kelvinToFahrenheit(kelvin) 
              : kelvinToCelsius(kelvin);
            const time = item.dt_txt;
            return (
              <TemperatureCard key={index} time={time} temp={temp} />
            );
          })}
      </div>
    </div>
  );
};

// Weather Card Component
const WeatherCard: React.FC<WeatherCardProps> = ({ weather, city, isFahrenheit, isTomorrow }) => {
  const kelvin = isTomorrow
  ? (weather && weather.list ? weather.list[8].main.temp : 0)
  : (weather && weather.list ? weather.list[0].main.temp : 0);

  const temperatureCelsius = weather && weather.list ? kelvinToCelsius(kelvin) : 'N/A';
  const temperatureFahrenheit = weather && weather.list ? kelvinToFahrenheit(kelvin) : 'N/A';
  const humidity = weather && weather.list ? weather.list[0].main.humidity : 'N/A';
  const pressure = weather && weather.list ? weather.list[0].main.pressure : 'N/A';
  const windSpeed = weather && weather.list ? weather.list[0].wind.speed : 'N/A';
  const visibility = weather && weather.list ? weather.list[0].visibility : 'N/A';

  return (
    <div className='flex flex-col bg-custom-gradient mt-10 w-full rounded-xl p-6'>
          <div className='flex items-center space-x-2 mb-4'>
              <p className='text-xl font-semibold'>{city}</p>
              <FaMapMarkerAlt size={20} />
          </div>
          
          <div className='flex justify-center space-x-3 m-4'>
              <FaThermometerHalf size={40} />
              {isFahrenheit ? <h2 className='text-5xl font-bold'>{temperatureFahrenheit}°F</h2> : <h2 className='text-5xl font-bold'>{temperatureCelsius}°C</h2>}
              <FaCloud size={40} />
          </div>
          
          <p className='text-base underline mb-4'></p>
          
          <div className='flex flex-wrap gap-4 justify-evenly mt-4'>
              <div className='text-center'>
                  <div>Humidity</div>
                  <div>{humidity}%</div>
              </div>
              <div className='text-center'>
                  <div>Visibility</div>
                  <div>{(visibility as number) / 1000} KM</div>
              </div>
              <div className='text-center'>
                  <div>Air Pressure</div>
                  <div>{pressure}hPa</div>
              </div>
              <div className='text-center'>
                  <div>Wind</div>
                  <div>{windSpeed}kmph</div>
              </div>
          </div>
      </div>
  );
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ temp, time }) => {
  return (
    <div className='relative flex flex-col rounded-2xl bg-[#9D46B2] p-4 items-center'>
      <div className='relative z-10 flex flex-col items-center text-white text-lg'>
        <TimeDisplay timeString={time} />
        <FaCloud className='text-white my-2' size={25} />
        <p className='text-white text-lg'>{temp}°C</p>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-[#363232] z-0 rounded-xl' />
    </div>
  );
};

const TimeDisplay: React.FC<{ timeString: string }> = ({ timeString }) => {
  const timePart = timeString.split(' ')[1];
  const [hours24, minutes] = timePart.split(':');
  let hours = parseInt(hours24, 10);
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedMinutes = minutes.padStart(2, '0');
  const formattedTime = `${hours}:${formattedMinutes} ${amPm}`;

  return <p className='text-white text-lg'>{formattedTime}</p>;
};

export default Content;
