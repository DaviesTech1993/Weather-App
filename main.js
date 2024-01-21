const api = {
    key: "f02b1b1c52e9347f4bea7e06e88cbb1f",
    base: "https://api.openweathermap.org/data/2.5/weather"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}


function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = (`${Math.round(weather.main.temp)} <span>℃</span>`);

    let weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText = weather.weather[0].main;

    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}℃ / ${Math.round(weather.main.temp_max)}℃`;
}

function dateBuilder(d){
  let months = ["January", "Febuary", "March", "April", "May", "June", "July", 
  "August", "September", "October", "November", "December"];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
  "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return ` ${day} ${date} ${month} ${year}`
}