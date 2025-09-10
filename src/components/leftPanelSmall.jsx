import React from 'react';

export default function LeftPanelSmall({ current, state }) {
  return (
<>

        <i className="bi bi-x-lg position-absolute top-0 end-0 m-2 closeButton"
        aria-label="Close"
        onClick={() => state(false)}></i>

    <div id="left-side" className="p-2 container d-flex flex-column align-items-center rounded-3  position-relative addBorders" >





      <div className=" container-sm forecast-tile flex-fill">
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
