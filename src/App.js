import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("rohru");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (data.cod === "404") {
        alert("City not found! Please enter a valid city name.");
        setWeatherData(null);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return '/thunder.png';
      case "Rain":
        return '/rain.png';
      case "Mist":
        return '/tornado.png';
      case "Clear":
        return '/sun.png';
      case "Haze":
        return '/sun.png';
      default:
        return 'null';
    }
  };
  return (
    <div className="App">
      <div className='container'>
        {weatherData && (
          <>
            <h1 className='container_date'>{formattedDate}</h1>
            <div className='weather_data'>
              <h2 className='container_city'>{weatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="180px"
                height="180px"
                alt="weather Icon"
              />
              <h2 className='container_degree'>{(weatherData.main.temp - 273.15).toFixed(2)}°C</h2>
              <h2 className='country_per'>{weatherData.weather[0].main}</h2>
              <form className='form' onSubmit={handleSubmit}>
                <input type='text' className='input' placeholder='Enter City Name' onChange={handleInputChange} />
                <button type='Submit'>Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
