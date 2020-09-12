const api = {

    key: "625be679b4dc5e945be4fd2ca7bb99c7",
    base: "https://api.openweathermap.org/data/2.5/"

}
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
      console.log(searchbox.value);
    }
  }
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  function displayResults (weather) {
   console.log(weather);
   let city = document.querySelector('.location .city');
   city.innerText = `${weather.name}, ${weather.sys.country}`;

   let now = new Date();
   let date = document.querySelector('.location .date');
   date.innerText = dateBuilder(now);

   //let time = document.querySelector('.location .time');
   //time.innerText = `${weather.timezone}`;

   let temp = document.querySelector('.current .temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

   let weather_el = document.querySelector('.current .weather');
   weather_el.innerText = weather.weather[0].main;

   let weather_type = document.querySelector('.current .wind');
   weather_type.innerText = `wind:${weather.wind.speed}kmph`;

   let humidity = document.querySelector('.current .humidity');
   humidity.innerText = `humidity:${weather.main.humidity}g.kg-1`;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  if (weather_el == 'Rain') {

    document.body.style.backgroundImage= "url('rain.jpg')";

    } else if (weather_el== 'Clouds') {
         $("body").css('background-image', 'url("clouds.jpg")');
    //document.body.weather_el.backgroundImage= "url('clouds.jpg')";

    } else if (weather_el== 'Clear') {

    document.body.style.backgroundImage= "url('clear.jpg')";

    }else if (weather_el== 'Snow') {

    document.body.style.backgroundImage= "url('snow.jpg')";

    } else {

    document.body.style.backgroundImage= "url('bg.jpg')";
    }



  }
  
    

  

 
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;

  }

 