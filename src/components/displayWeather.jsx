import React from 'react';

export default function DisplayWeather({ current, forecastList }) {

  console.log("Rendering DisplayWeather with current:", current, "and forecastList:", forecastList);
  return (
    <div id="display-weather-card" className="card p-3 adjustHeight ">
      <div className="d-flex flex-column overflow-auto hideScrollbar add-borders">
        <div className="d-flex justify-content-between align-items-stretch mb-0 forecast-tile-header add-borders">
          <div style={{width:'35%'}} className="p-2 forecast-tile-header flex-fill add-borders ">
 
            
            
            <h1 id="temperature" className="align-center"><i className={`bi ${current? (current.temp>=30? "bi-fire" : current.temp<=15? "bi-snow": "bi-thermometer-half"):""}`}></i>{current ? `${Math.round(current.temp)}` : ''}&deg;C</h1>
       
     
            
              </div>
          <div style={{width:'65%'}} className="p-2 forecast-tile-header">
            <ul className="list-unstyled mb-0">
              <li id="rowList_1"><i className=" bi bi-thermometer font-bold"></i>Feels Like: { current?.feels_like ?? '-' }&deg;C</li>
              <li id="rowList_2"><i className=" bi bi-water font-bold"></i>Humidity: { current?.humidity ?? '-'}%</li>
              <li id="rowList_3"><i className=" bi  bi-compass font-bold"></i>Pressure:  {current?.pressure ?? '-'}</li>
              <li id="rowList_4"><i className=" bi bi-wind font-bold"></i>Wind Speed: { current?.wind ?? '-' } m/s</li>
            </ul>
          </div>
        </div>

        <div className="flex-grow-1 d-flex gap-0 overflow-auto align-center adjustHeight add-borders">
          <div className="flex-fill overflow-auto hideScrollbar add-borders">
            {forecastList?.slice(0,4).map((f, idx) => (
              <div key={idx} className="mb-0 p-2 forecast-tile add-borders" >
                <div><strong><i className=" bi bi-calendar3 font-bold"></i> { f.date}</strong> <small><i className=" bi bi-clock font-bold"></i> { f.time}</small></div>
                <div> <i className=" bi bi-thermometer-half font-bold"></i> Temperature: { f.temp}&deg;C</div>
                <div> <i className=" bi bi-thermometer font-bold"></i>Feels Like: { f.feels_like}&deg;C</div>
                <div> <i className=" bi bi-water font-bold"></i>Humidity: { f.humidity}%</div>
                <div> <i className=" bi bi-wind font-bold"></i>Wind Speed: { f.wind} m/s</div>
              </div>
            ))}
          </div>

          <div className="flex-fill overflow-auto hideScrollbar add-borders">
            {forecastList?.slice(4,11).map((f, idx) => (
              <div key={idx} className="mb-0 p-2 forecast-tile add-borders" >
                <div><strong><i className=" bi bi-calendar3 font-bold"></i> { f.date}</strong> <small><i className=" bi bi-clock font-bold"></i> { f.time}</small></div>
                <div>  <i className=" bi bi-thermometer-half font-bold"></i> Temperature: {f.temp}&deg;C</div>
                <div><i className=" bi bi-thermometer font-bold"></i>Feels Like: {f.feels_like}&deg;C</div>
                <div> <i className=" bi bi-water font-bold"></i>Humidity: {f.humidity}%</div>
                <div> <i className=" bi bi-wind font-bold"></i>Wind Speed: {f.wind} m/s</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
