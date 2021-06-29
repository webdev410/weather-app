// api.openweathermap.org / data / 2.5 / forecast ? q = { city name } & appid={ API key }

// API Key - fb3697a89b0dcdb9ac99c595bc4f441c


var weatherFormEl = document.querySelector('#weatherForm')
var cityInputEl = document.querySelector('#cityInput')
var cityContainer = document.querySelector('#city-container')
var citySearchTerm = document.querySelector('#city-search-term')

var formSubmit = function (event) {
       event.preventDefault();
       var cityInput = cityInputEl.value.trim();
       // console.log('cityInput: ', cityInput)

       
       if (cityInput) {
              getUserCity(cityInput);
              cityContainer.textContent = '';
              cityInputEl.value = '';

             

       } else {
              alert('Please enter a valid city name');
       }
}


var getUserCity = function (cityInput) {
       var apiUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&appid=fb3697a89b0dcdb9ac99c595bc4f441c'

       fetch(apiUrl)
              .then(function (response) {
                     if (response.ok) {
                            console.log("response OK. response = ", response);
                            response.json().then(function (cityInput) {
                                   console.log("success", cityInput);
                                   displayCity('cityInput', cityInput);
                            });
                     } else {
                            alert('Error: ' + response.statusText);
                     }
              })
              .catch(function (error) {
                     alert('Unable to connect to Weather API');
              });
};


weatherFormEl.addEventListener('submit', formSubmit);



//        GIVEN a weather dashboard with form inputs
//        WHEN I search for a city
//            THEN I am presented with current and future conditions for that city and that city is added to the search history

//        WHEN I view current weather conditions for that city
//            THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
//        WHEN I view the UV index
//        THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//        
//       WHEN I view future weather conditions for that city
//            THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//       
//           WHEN I click on a city in the search history
//            THEN I am again presented with current and future conditions for that city