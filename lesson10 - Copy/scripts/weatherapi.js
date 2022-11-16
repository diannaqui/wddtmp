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

    let weatherCard = document.createElement('section');
    let currentText = document.createElement('h2');
    let currentTemp = document.createElement('p');
    let currentTextWind = document.createElement('h2');
    let wind = document.createElement('p');
    let currentTextLL = document.createElement('h2');
    let latitudeLongitude = document.createElement('img');
    let gridLL = document.createElement('div')
    let latitudeNumber = document.createElement('p');
    let longitudeNumber = document.createElement('p');
    

    // TEMPERATURE

    currentText.textContent = 'Current condition & ICON';

    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `The current temperature in Fairbanks, Alaska is <strong>${tF}</strong> &deg;F`;

    weatherCard.appendChild(currentText);
    weatherCard.appendChild(currentTemp);


    // WEATHER ICON

    for (let i = 0; i < weatherData.weather.length; i++) {
      
      let weatherIcon = document.createElement('img');
      let captionDesc = document.createElement('figcaption');

      const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[i].icon}.png`;
      const desc = weatherData.weather[i].description;

      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', `Picture of ${desc}`);
      captionDesc.textContent = capital_letter(desc);

      weatherCard.appendChild(weatherIcon);
      weatherCard.appendChild(captionDesc);

    }

    // WIND CHILL // LATITUDE & LONGITUDE

    currentTextWind.textContent = 'Wind Chill';
    currentTextLL.textContent = 'Latitude & Longitude';

    const smH = weatherData.wind.speed;

    if (tF <= 50 && smH > 3) { 
      const windC = windChill(tF, smH);
      wind.textContent = windC.toFixed(2);
    }
    
    else {
      wind.textContent = 'N/A';
    }

    const globe = 'images/latitudeLongitude.svg';
    const descGlobe = 'Two globes showing latitude and longitude';

    latitudeLongitude.setAttribute('src', globe);
    latitudeLongitude.setAttribute('alt', descGlobe);

    let latitude = weatherData.coord.lat;
    let longitude = weatherData.coord.lon;

    latitudeNumber.textContent = latitude;
    longitudeNumber.textContent = longitude;

    gridLL.appendChild(latitudeNumber);
    gridLL.appendChild(longitudeNumber);

    weatherCard.appendChild(currentTextWind);
    weatherCard.appendChild(wind);
    weatherCard.appendChild(currentTextLL);
    weatherCard.appendChild(latitudeLongitude);
    weatherCard.appendChild(gridLL);

    document.querySelector('.weatherInfo').appendChild(weatherCard);
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