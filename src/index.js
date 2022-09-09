function formatDate(date) {
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${days[day]} ${hours}:${minutes}`;
}

function formatDay(timestamp) { 
    let date = new Date(timestamp*1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

function displayForecast(response) {
   let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                ` 
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>                   <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="70" />
                        <div class="weather-forecast-temperatures">
                        <span class="temperature-max">${Math.round(forecastDay.temp.max)}&#176;</span>
                        <span class="temperature-min">${Math.round(forecastDay.temp.min)}&#176;</span>
                    </div>
                </div>
                `;
        }
    });
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}
function enterCity(event) {
    event.preventDefault();
    let city = document.querySelector("#CityName").value;
    searchCity(city);
}

function searchCity(city){
    let apikey = "2f823f714013fa6686732f0c02dfd447";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&&units=metric`;
    axios.get(apiurl).then(showtemp);
}

function getForecast(coordinates) { 
    let apiKey = "2f823f714013fa6686732f0c02dfd447";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
};
  
function showtemp(response) {
    let temp = document.querySelector(".temp");
    celsius_temp = Math.round(response.data.main.temp);
    temp.innerHTML = celsius_temp;
    let info = document.querySelector(".info");
    info.innerHTML = response.data.weather[0].description.toUpperCase();
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
    let name = document.querySelector("#city");
    name.innerHTML = response.data.name;
    let icon = document.querySelector("#icon");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
    
    getForecast(response.data.coord);
}

function searchlocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
} 
function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apikey = "2f823f714013fa6686732f0c02dfd447";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&&units=metric`;
     axios.get(apiurl).then(showtemp);
}
  
function fahrenheitConverter(event) {
    event.preventDefault();
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(temp * 1.8 + 32);
}
  
function celsiusConverter(event) {
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
    let temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(celsius_temp);
  }

  function fahrenheitConverter(event) {
    event.preventDefault();
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
    let temp = document.querySelector(".temp");
    temp.innerHTML = Math.round((celsius_temp * 9) / 5 + 32);
}
  
let curday_time = document.querySelector(".daytime");
let now = new Date();
curday_time.innerHTML = formatDate(now);

let celsius_temp = null;


let searchform = document.querySelector("#input-city");
searchform.addEventListener("submit", enterCity);

let searchmyloc = document.querySelector("#mylocation");
searchmyloc.addEventListener("click", searchlocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitConverter);  

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusConverter);
searchCity("Paris");
displayForecast();