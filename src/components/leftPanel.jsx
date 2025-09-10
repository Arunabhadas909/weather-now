import React from 'react';

export default function LeftPanel({ current }) {
  return (
    <>
    <div id="left-side" className="p-2 container">
      <div className=" container-sm forecast-tile">
        <div className="d-flex forecast-tile "  style={{border:'solid 1px black'}}>
          <div id="weather_type " className="p-2 flex-fill forecast-tile-2 align-center" style={{width:'55%'}}>
            <h5 id="LastUpdatedTag forecast-tile " className='align-center'> Last Updated:</h5>
          </div>
          <div className="p-2 flex-fill forecast-tile-2" style={{borderLeft:'double 3px black', width:'45%'}}>
            <div id="LastUpdatedDate"><i className=" bi bi-calendar3 font-bold"> {current?.lastUpdatedDate || '-'}</i></div>
            <div id="LastUpdatedTime"><i className=" bi bi-clock font-bold"> {current?.lastUpdatedTime || '-'}</i></div>
          </div>
        </div>

        <div className="d-flex mt-2 forecast-tile" style={{border:'solid 1px black'}}>
          <div className="flex-fill p-2 forecast-tile-2">
            <h6 id="maxTemp"><i className=" bi bi-thermometer-high font-bold"></i> Max Temp: {current?.maxTemp ?? '-'}</h6>
          </div>
          <div className="flex-fill p-2 forecast-tile-2" style={{borderLeft:'double 3px black'}}>
            <h6 id="minTemp"><i className=" bi bi-thermometer-low font-bold"></i> Min Temp: {current?.minTemp ?? '-'}</h6>
          </div>
        </div>
      </div>
    </div>




</>




   


  );
}
