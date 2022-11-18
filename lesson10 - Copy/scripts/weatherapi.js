// const currentTemp = document.querySelector('#current-temp');
// const weatherIcon = document.querySelector('#weather-icon');
// const captionDesc = document.querySelector('figcaption');


// const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

// async function apiFetch() {
//   try {
//     const response = await fetch(url);
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data); // this is for testing the call
//       displayResults(data);
//     } else {
//       throw Error(await response.text());
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// function displayResults(weatherData) {
//   currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(
//     0
//   )}</strong>`;

//   const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
//   const desc = weatherData.weather[0].description;

//   weatherIcon.setAttribute('src', iconsrc);
//   weatherIcon.setAttribute('alt', desc);
//   captionDesc.textContent = desc;
// }
// apiFetch();


const weather = document.querySelector('.weatherInfo');

  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=766cc4c5847dc1e46a5927930e1b85f6';

  //////////////////////////
  //  Capitalize letters  //
  //////////////////////////

  function capital_letter(str) 
  {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
          str[i] = `${str[i][0].toUpperCase()}${str[i].substr(1)}`;
      }
      return str.join(" ");
  }

  /////////////////////////
  //       Display       //
  /////////////////////////

  function  displayResults(weatherData) {

    let weatherCard = document.createElement('section');
    let currentText = document.createElement('h2');
    let currentTemp = document.createElement('p');

    

    // TEMPERATURE

    currentText.textContent = 'Current condition & ICON';

    const tF = weatherData.main.temp.toFixed(0);
    currentTemp.innerHTML = `The The current temperature in Fairbanks, Alaska is <strong>${tF}</strong> &deg;F`;

    weatherCard.appendChild(currentText);
    weatherCard.appendChild(currentTemp);


    // WEATHER ICON - multiple weather events

      
      let weatherIcon = document.createElement('img');
      let captionDesc = document.createElement('figcaption');

      const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
      const desc = weatherData.weather[0].description;

      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', `Picture of ${desc}`);
      captionDesc.textContent = `ICON for "${capital_letter(desc)}"`;

      weatherCard.appendChild(weatherIcon);
      weatherCard.appendChild(captionDesc);

    



    document.querySelector('.weatherInfo').appendChild(weatherCard);
  }


  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }

  apiFetch();

