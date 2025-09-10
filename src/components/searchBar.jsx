// import React from 'react';

// export default function SearchBar({ value, setValue, onSearch }) {
//   return (

//     <>
    
//     <div className='container text-center m-3'>

//       <div className='row '>

//         <div className='col'>


//           <input
//             // id="locationInput"
//             className="form-control"
//             placeholder="  Enter Location"
//             value={value}
//             onChange={(e) => setValue(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter') onSearch(value);
//             } } />


//         </div>



//         <div className='col'>
//           <button type="submit" className="btn btn-primary" onClick={() => onSearch(value)}>Search</button>
//         </div>

//       </div>

//     </div>
    
    
//     {/* <div>

//       </div> */}
      
//       </>
//    );

// }





import React from 'react';

export default function SearchBar({ value, setValue, onSearch }) {
  return (
    <div className="container text-center m-3">
      <div className="row g-2">
        <div className="col-2">
          <input
          id='locationInput'
            className="form-control"
            placeholder="Enter Location"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSearch(value);
            }}
          />
        </div>
        <div className="col-2 d-grid">
          <button 
            type="submit"
            className="btn btn-info  inputSearchButton "
            onClick={() => onSearch(value)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
