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
  
function showtemp(response) {
    let temp = document.querySelector(".temp");
    temp.innerHTML = Math.round(response.data.main.temp);
    let info = document.querySelector(".info");
    info.innerHTML = response.data.weather[0].main;
    let humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    let wind = document.querySelector(".wind");
    wind.innerHTML = `Wind: ${response.data.wind.speed} m/s`;
    let name = document.querySelector("#city");
    name.innerHTML = response.data.name.toUpperCase();
    let icon = document.querySelector("#icon");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", response.data.weather[0].description);
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

let curday_time = document.querySelector(".daytime");
let now = new Date();
curday_time.innerHTML = formatDate(now);

let searchform = document.querySelector("#input-city");
searchform.addEventListener("submit", enterCity);

let searchmyloc = document.querySelector("#mylocation");
searchmyloc.addEventListener("click", searchlocation);

searchCity("Paris");

function celsiusConverter() {
    /*let number = document.querySelector(".temp");
    number.innerHTML = "28";*/
  }
  
  function fahrenheitConverter() {
    /*let number = document.querySelector(".temp");
    let temp = 28;
    number.innerHTML = Math.round(temp * 1.8 + 32);*/
  }
  
  let celsius = document.querySelector(".Celsius");
  celsius.addEventListener("click", celsiusConverter());
  
  let fahrenheit = document.querySelector(".Fahrenheit");
  fahrenheit.addEventListener("click", fahrenheitConverter);     