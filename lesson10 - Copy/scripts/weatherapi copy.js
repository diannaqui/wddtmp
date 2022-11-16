// select HTML elements in the document
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const wind = document.querySelector('.wind');


if (wind) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

  // //////////////////////////// 
  // Capitalize letters function
  // ////////////////////////////

  function capital_letter(str) 
  {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }

      return str.join(" ");
  }


  function windChill(tF, smH) {
    const f = 35.74 + 0.6215 * tF - 35.75 * (smH**0.16) + 0.4275 * tF * (smH**0.16);
    return f;
  }


  function  displayResults(weatherData) {
    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `<strong>${tF}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capital_letter(desc);

    const smH = weatherData.wind.speed;

    if (tF <= 50 && smH > 3) { 
      const windC = windChill(tF, smH);
      wind.textContent = windC.toFixed(2);
    }
    
    else {
      wind.textContent = 'N/A';
    }
  }


  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  apiFetch();

}











GOOODDD


// select HTML elements in the document
// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');
// const wind = document.querySelector('.wind');

const weather = document.querySelector('.weatherInfo');

if (weather) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

  //////////////////////////
  //  Capitalize letters  //
  //////////////////////////

  function capital_letter(str) 
  {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
          str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }

      return str.join(" ");
  }


  /////////////////////////
  // Calculate WindChill //
  /////////////////////////

  function windChill(tF, smH) {
    const f = 35.74 + 0.6215 * tF - 35.75 * (smH**0.16) + 0.4275 * tF * (smH**0.16);
    return f;
  }


  /////////////////////////
  //       Display       //
  /////////////////////////

  function  displayResults(weatherData) {

    
    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `<strong>${tF}</strong>`;

    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = capital_letter(desc);

    const smH = weatherData.wind.speed;

    if (tF <= 50 && smH > 3) { 
      const windC = windChill(tF, smH);
      wind.textContent = windC.toFixed(2);
    }
    
    else {
      wind.textContent = 'N/A';
    }
  }


  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  apiFetch();

  function displayWeather() {

    let temp = document.createElement('p');
    let img = document.createElement('figure');

    temp.innerHTML = `The current temperature in Fairbanks, Alaska is <span id="current-temp"></span> &deg;F`;
    img.setAttribute
  }
}