// get form element
const form = document.getElementsByTagName("form")[0];

const input  = document.getElementsByTagName('input')[0];

const searchLocationsUrl = (city) => `http://api.weatherapi.com/v1/search.json?key=90f57187a7384eaba4901536232803&q=${city}`

// add submit event listener to form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = input.value;

  if (city) {
    getWeatherStatus(city)
  }
});

// add load event listener to window to load current location
window.addEventListener("load", async () => {
  let long;
  let lat;
  let apiCoords;

  if (navigator.geolocation) {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    long = position.coords.longitude;
    lat = position.coords.latitude;

    apiCoords = `http://api.positionstack.com/v1/reverse?access_key=cd226765d0df76d452b529bfd4c424b8&query=${lat},${long}`;

    fetch(apiCoords)
    .then((response) => response.json())
    .then((res)=>{
      const c = res.data[0].region
      if (c) {
        getWeatherStatus(c)
      }
    })
    .catch((e)=>{
      console.log({ error });
    })
  }
});

// get weather status used `weatherapi.com`
const getWeatherStatus = (city)=>{
  const api = `https://api.weatherapi.com/v1/current.json?key=90f57187a7384eaba4901536232803&q=${city}&aqi=no`;
  fetch(api)
    .then((response) => response.json())
    .then((weather) => {
      document.getElementById(
        "location"
      ).innerHTML = `${weather.location.name} / ${weather.location.country}`;
      document.getElementById(
        "degree"
      ).innerHTML = `${weather.current.temp_c} &#8451 / ${weather.current.temp_f} &#8457`;
      document.getElementById("icon").src = weather.current.condition.icon;
      document.getElementById("condition").innerHTML =
        weather.current.condition.text;
    })
    .catch((error) => {
      console.log({ error });
    });
}
