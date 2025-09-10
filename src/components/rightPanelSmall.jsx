import React from 'react';

export default function RightPanelSmall({ forecastShort, state }) {

  return (

    <>
 
        <i className="bi bi-x-lg position-absolute top-0 end-0 m-2 closeButton"
        aria-label="Close"
        onClick={() => state(false)}></i>
        
   
    <div id="right-side" className='container d-flex addBorders position-relative rounded-3 '>


   
      {forecastShort?.map((f, idx) => (
        <div key={idx} className="forecast-tile my-2 mx-1 flex-fill">
          <h5><i className=" bi bi-calendar3 font-bold"></i> { f.label}</h5>
          <hr />

          <small className='d-block overflow-x-auto smallScrollable hideScrollbar text-center'>{f.weather}</small>
          

          
          <hr />
          <h3> <i className=" bi bi-thermometer-half font-bold"></i> {f.temp}&deg;C</h3>
        </div>
      )) || null}
    </div>




 </>
  );
}
