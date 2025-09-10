


const URL_GEOCODE = "https://geocoding-api.open-meteo.com/v1/search";
const URL_FORECAST = "https://api.open-meteo.com/v1/forecast";

const URL_BACKEND = "http://localhost:4000"; 

export async function resolveCoords(cityOrCoords) {
  if (typeof cityOrCoords === "string") {
    const geoRes = await fetch(`${URL_GEOCODE}?name=${encodeURIComponent(cityOrCoords)}`);

    console.log("geoRes-> Geocoding response:", geoRes);
    if (!geoRes.ok) throw new Error("Geocoding error: city not found");

    const geoData = await geoRes.json();
    console.log("geoData-> Geocoding response data:", geoData);
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`No coordinates found for city: ${cityOrCoords}`);
    }

  
    const { name, country, latitude, longitude, timezone } = geoData.results[0];
    return { city: name, country, lat: latitude, lon: longitude, timezone };
  }

  
  return { lat: cityOrCoords.lat, lon: cityOrCoords.lon };
}



export async function fetchWeather(cityOrCoords) {


const { city, country, lat, lon, timezone } = await resolveCoords(cityOrCoords);
console.log("lat: ",lat, " lon: ", lon);  
  const res = await fetch(`${URL_BACKEND}/api/weather?lat=${lat}&lon=${lon}`);
const data = await res.json();

return data;

  };

