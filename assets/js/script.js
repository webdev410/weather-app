// api.openweathermap.org / data / 2.5 / forecast ? q = { city name } & appid={ API key }

// API Key - fb3697a89b0dcdb9ac99c595bc4f441c

var apiKey = "fb3697a89b0dcdb9ac99c595bc4f441c"

var weatherFormEl = document.querySelector('#weatherForm')
var cityInputEl = document.querySelector('#cityInput')
var cityContainer = document.querySelector('#city-container')
var citySearchTerm = document.querySelector('#city-search-term')
var tempEl = document.querySelector('#temp')
var humidityEl = document.querySelector('#humidity')
var windEl = document.querySelector('#wind')
var UVEl = document.querySelector('#uv-index')

// main weather div
var cityName = ""
var temp = ""
var wind = ""
var humidity = ""
var UVindex = ""
var lon = ""
var lat = ""


var formSubmit = function (event) {
       event.preventDefault();
       var cityInput = cityInputEl.value.trim();
       console.log('formSubmit - cityInput: ', cityInput)

       if (cityInput) {
              getUserCity(cityInput);
              cityInputEl.value = '';

       } else {
              alert('Please enter a valid city name');
       }
}


function getUV(lat, lon) {
       var UVApiResponse = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey

       fetch(UVApiResponse)
              .then(function (response) {
                     if (response.ok) {
                            response.json().then(function (data) {
                                   var UVindex = data.current.uvi
                                   console.log('UVIndex', UVindex)
                                   console.log(data)
                                   UVEl.textContent = "UV: " + UVindex
                            })
                     }
              });
              if (UVindex<=2){
                     UVEl.setAttribute("style", "background-color: green; color: white; border-radius: 5px; width: 50px; padding:5px;")
              }
              if (UVindex>2 && UVindex<=5){
                     UVEl.setAttribute("style", "background-color: yellow; color: black; border-radius: 5px; width: 50px; padding:5px;")
              }
              if (UVindex>5 && UVindex<=8){
                     UVEl.setAttribute("style", "background-color: orange; color: black; border-radius: 5px; width: 50px; padding:5px;")
              }
              if (UVindex>8 && UVindex<=10){
                     UVEl.setAttribute("style", "background-color: red; color: black; border-radius: 5px; width: 50px; padding:5px;")
              }
              else if (UVindex>11){
                     UVEl.setAttribute("style", "background-color: purple; color: white; border-radius: 5px; width: 50px; padding:5px;")
              }

  

       return UVApiResponse;
}



function slices(sliceObj) {

       var days = new Array();

       var dayN = -1
       console.log("sliceObj: ", sliceObj)

       for (var i = 0; i < sliceObj.length; i++) {
              console.log(sliceObj[i].main.temp)
              var dayTemp = sliceObj[i].main.temp
              
              if ([0, 7, 15, 23, 31].includes(i)) {
                     dayN++
                     days[dayN] = new Array();

              }
              days[dayN].push(dayTemp)
              console.log("dayN", dayN)
              console.log(days)
       }

       // Do min max for each day

}


var getUserCity = function (cityInput) {
       var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + ',us&appid=' + apiKey + '&units=imperial'

       fetch(apiUrl)
              .then(function (response) {
                     if (response.ok) {
                            console.log("response OK. response = ", response);
                            response.json().then(function (data) {
                                   console.log("data", data);

                                   sliceObj = data.list

                                   cityName = data.city.name;
                                   temp = data.list[0].main.temp;
                                   humidity = data.list[0].main.humidity;
                                   wind = data.list[0].wind.speed;
                                   returnedLat = data.city.coord.lat;
                                   returnedLon = data.city.coord.lon;

                                   console.log('cityName', cityName);
                                   console.log('temp', temp);
                                   console.log('humidity', humidity);
                                   console.log('wind', wind, "mph");

                                   citySearchTerm.textContent = cityName;
                                   tempEl.textContent = "Temp: " + temp;
                                   humidityEl.textContent = "Humidity: " + humidity;
                                   windEl.textContent = "Wind Speed: " + wind + "mph";

                                   var returnedUV = getUV(returnedLat, returnedLon)
                                   console.log(returnedUV)

                                   slices(sliceObj)

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
//            THEN I am presented with the city name, 
//            the date, 
//            an icon representation of weather conditions, 
//            the temperature, 
//            the humidity, 
//            the wind speed, 
//            and the UV index
//        WHEN I view the UV index
//        THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//        
//       WHEN I view future weather conditions for that city
//            THEN I am presented with a 5 - day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
//       
//           WHEN I click on a city in the search history
//            THEN I am again presented with current and future conditions for that city