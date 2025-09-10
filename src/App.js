


import React, { useEffect, useState } from 'react';
import SearchBar from './components/searchBar';
import LeftPanel from './components/leftPanel';
import RightPanel from './components/rightPanel';
import DisplayWeather from './components/displayWeather';
import { fetchCurrent, fetchForecast } from './services/weatherappApi';
import { weatherCodeMap } from './weatherCodeMap';
import { resolveCoords } from './services/weatherappApi';
import { fetchWeather } from './services/weatherappApi';
import LeftPanelSmall from './components/leftPanelSmall';
import RightPanelSmall from './components/rightPanelSmall';


import useMediaQuery from './components/mediaScreenCheck';
import { resolve } from 'chart.js/helpers';
import { useRef } from 'react';

import LoadingSpinner from './components/loadingSpinner';

export default function App() {
  const [query, setQuery] = useState('');
  const [locationName, setLocationName] = useState('Location');
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [forecastList, setForecastList] = useState([]);
  const [forecastShort, setForecastShort] = useState([]);
   const [renderLeft, setRenderLeft] = useState(false);
   const [renderRight, setRenderRight] = useState(false);

   const [currentTarget, setCurrentTarget] = useState(""); 


   const [loading, setLoading] = useState(true);

 
  function currentDateString() {
    const d = new Date();
    const dd = d.getDate();
    const mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    return `${dd}-${mm < 10 ? '0' + mm : mm}-${yyyy}`;
  }
  function currentTimeString() {
    const t = new Date();
    const pad = (n) => (n < 10 ? '0' + n : n);
    return `${pad(t.getHours())}:${pad(t.getMinutes())}:${pad(t.getSeconds())}`;
  }






  function mapForecast(hourly) {
  if (!hourly || !hourly.time) return [];

  return hourly.time.map((t, i) => ({
    date: t.slice(0, 10),
    time: t.slice(11, 19),
    temp: Math.round(hourly.temperature[i]),
    feels_like: Math.round(hourly.feels_like[i]),
    humidity: hourly.humidity[i],
    pressure: hourly.pressure[i],
    wind: hourly.windspeed[i],
    weather_description: weatherCodeMap[hourly.weathercode[i]] || "Unknown",
  }));
}











  async function loadFor(locationOrCoords) {
  try {

    console.log("Loading weather for:", locationOrCoords);
    const data = await fetchWeather(locationOrCoords);
    console.log("Fetched weather data in load For func:", data);

    setLocationName(`${data.city}, ${data.country}`);

  
    setCurrentData({
      temp: data.current.temperature,
      feels_like: data.current.feels_like,
      humidity: data.current.humidity,
      pressure: data.current.pressure,
      wind: data.current.windspeed,
      maxTemp: data.daily.temp_max[0],
      minTemp: data.daily.temp_min[0],
      lastUpdatedDate: currentDateString(),
      lastUpdatedTime: currentTimeString(),
    });


    const mapped = mapForecast(data.hourly);
    setForecastList(mapped);


    const dailyShort = data.daily.time.map((date, i) => ({
      label: date.slice(5, 10), 
      maxTemp: data.daily.temp_max[i],
      minTemp: data.daily.temp_min[i],
      temp: Math.round((data.daily.temp_max[i] + data.daily.temp_min[i]) / 2), 
      weather: weatherCodeMap[data.daily.weathercode[i]] || "Unknown",
    })).slice(0, 4);

    setForecastShort(dailyShort);

    console.log("Forecast Short:", dailyShort);
    console.log("Mapped Hourly Forecast:", mapped);

  } catch (err) {
    alert("Error Message: ",err.message || "Fetch error");
    console.error(err);
  }
}

















  useEffect(() => {

  const loadWeather = async () => {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const coords = { lat: pos.coords.latitude, lon: pos.coords.longitude };

          console.log("Geolocation success, coords:", coords);

          setCurrentTarget(coords);
          await loadFor(coords); 

          setLoading(false);

        },
        async (err) => {
         
          console.warn("Geolocation denied or failed, loading default city.");
          await loadFor("kolkata");
        }
      );

      console.log("Lat and Lon -> kolkata: ", await resolveCoords("kolkata"));
     
    } else {
     
      await loadFor("kolkata");
    }
  };

  loadWeather();









  


}, []);



const currentTargetRef = useRef(currentTarget);
useEffect(() => {
  currentTargetRef.current = currentTarget;
}, [currentTarget]);

useEffect(() => {
  const interval = setInterval(() => {
    console.log("Auto-refreshing weather data for:", currentTargetRef.current);
    loadFor(currentTargetRef.current);
  }, 6000); 

  return () => clearInterval(interval);
}, []);








  async function handleSearch(input) {
    if (!input) return;
    setCurrentTarget(input);
    await loadFor(input);
    setQuery('');
  }


navigator.geolocation.getCurrentPosition(
  (pos) => console.log('success', pos),
  (err) => console.log('error', err)
);

  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (

    <>

    {loading ? <LoadingSpinner /> : (
                  <div className="container-fluid" style={{minHeight:'100vh', overflowX:'hidden', backgroundImage:'url(https://t3.ftcdn.net/jpg/09/74/93/64/360_F_974936452_zMsdvroBfXqcAqsUwWJPHqcXIELWkxXI.jpg)', backgroundSize:'cover', backgroundPosition:'center', backgroundRepeat:'no-repeat'}}>
  
                  <div id="header" className='container-fluid text-center m-3 text-shadow'><h1 id="location">{locationName}</h1></div>
                <div className='container-sm'>
                      <SearchBar value={query} setValue={setQuery} onSearch={handleSearch} />
                  
                </div>

                  <div className="row align-items-center">
                
                      <div className="col ">
                

                      { (isMobile )? (<div className="position-relative"><button type='button' className='position-absolute start-0 leftButton' onClick={() => setRenderLeft(!renderLeft)}><i className="bi bi-chevron-right font-bold"></i></button></div>)
                        : <LeftPanel current={currentData} />}
                      {renderLeft ? <div className=" overlay-panel overlay-panel-left">
                        <LeftPanelSmall current={currentData}  state={setRenderLeft} />
                        </div> : null}


                        </div>

                  <div className="col g-5 ">
                        <DisplayWeather current={currentData} forecastList={forecastList} />
                      </div>

                      <div className="col ">
                    

                        { (isMobile )? (<div className="position-relative"><button type='button' className='position-absolute end-0 rightButton' onClick={() => setRenderRight(!renderRight)}><i className="bi bi-chevron-left font-bold"></i></button></div>)
                        : <RightPanel forecastShort={forecastShort} />}

                        {renderRight ? <div className="overlay-panel overlay-panel-right">
                        <RightPanelSmall forecastShort={forecastShort} state={setRenderRight} />
                        </div> : null}

                      </div>
                    

                    
                  </div>

                  </div>

    

            )}

    </>
  );
}



