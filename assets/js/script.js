var apiKey = "fb3697a89b0dcdb9ac99c595bc4f441c"

var weatherFormEl = document.querySelector('#weatherForm')
var cityInputEl = document.querySelector('#cityInput')
var cityContainer = document.querySelector('#city-container')
var citySearchTerm = document.querySelector('#city-search-term')
var tempEl = document.querySelector('#temp')
var humidityEl = document.querySelector('#humidity')
var windEl = document.querySelector('#wind')
var UVEl = document.querySelector('#uv-index')
var descriptionEl = document.querySelector("#description")
var iconEl = document.querySelector('#iconEl')
var iconImg = document.createElement('img')

// main weather div
var cityName = ""
var temp = ""
var wind = ""
var humidity = ""
var UVindex = ""
var lon = ""
var lat = ""
var description = ""
var descriptionIcon = ""

// 5 day div
var day1Card = document.querySelector('#day1')
var day2Card = document.querySelector('#day2')
var day3Card = document.querySelector('#day3')
var day4Card = document.querySelector('#day4')
var day5Card = document.querySelector('#day5')

var day1Title = document.querySelector('#day1-title')
var day2Title = document.querySelector('#day2-title')
var day3Title = document.querySelector('#day3-title')
var day4Title = document.querySelector('#day4-title')
var day5Title = document.querySelector('#day5-title')

var day1iconEl = document.querySelector('#day1-icon')
var day2iconEl = document.querySelector('#day2-icon')
var day3iconEl = document.querySelector('#day3-icon')
var day4iconEl = document.querySelector('#day4-icon')
var day5iconEl = document.querySelector('#day5-icon')

var iconImg1 = document.createElement('img')
var iconImg2 = document.createElement('img')
var iconImg3 = document.createElement('img')
var iconImg4 = document.createElement('img')
var iconImg5 = document.createElement('img')

var day1temp = document.querySelector('#day1-temp')
var day2temp = document.querySelector('#day2-temp')
var day3temp = document.querySelector('#day3-temp')
var day4temp = document.querySelector('#day4-temp')
var day5temp = document.querySelector('#day5-temp')

var day1wind = document.querySelector('#day1-wind')
var day2wind = document.querySelector('#day2-wind')
var day3wind = document.querySelector('#day3-wind')
var day4wind = document.querySelector('#day4-wind')
var day5wind = document.querySelector('#day5-wind')

var day1humidity = document.querySelector('#day1-humidity')
var day2humidity = document.querySelector('#day2-humidity')
var day3humidity = document.querySelector('#day3-humidity')
var day4humidity = document.querySelector('#day4-humidity')
var day5humidity = document.querySelector('#day5-humidity')

var searchListBtn = document.createElement('button')
var searchList = []

var formSubmit = function (event) {
        event.preventDefault();
        var cityInput = cityInputEl.value.trim();
        //     console.log('formSubmit - cityInput: ', cityInput)

        if (cityInput) {
                getUserCity(cityInput);
                cityInputEl.value = '';

        } else {
                alert('Please enter a valid city name');
        };
};

function searchHistory() {
        var buttonGroup = document.querySelector('#btn-group')
        var button = document.createElement('button')

        searchList = JSON.parse(localStorage.getItem("searchTerm"));
        if (searchList === null) {
                searchList = [];
        }

        for (var i = 0; i < searchList.length; i++) {
                button.textContent = searchList[i]
                console.log(button)
                console.log(searchList[i])
                button.setAttribute("class", "btn btn-primary btn-block searchHistoryBtn")
                buttonGroup.appendChild(button)
        }
}

//not working
function previousSearch(searchListBtn) {

        searchListBtn = document.querySelector(".searchHistoryBtn")

        console.log("previousSearch")
        searchListBtn.preventDefault();
        cityInput = searchListBtn.target.textContent;
        formSubmit();
}

function getUV(lat, lon) {
        var UVApiResponse = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey

        fetch(UVApiResponse)
                .then(function (response) {
                        if (response.ok) {
                                response.json().then(function (data) {
                                        var UVindex = data.current.uvi
                                        // console.log('UVIndex', UVindex)
                                        // console.log(data)
                                        UVEl.textContent = "UV: " + UVindex

                                        if (UVindex <= 2) {
                                                UVEl.setAttribute("style", "background-color: green; color: white; border-radius: 5px; width: 50px; padding:5px;")
                                        }
                                        if (UVindex > 2 && UVindex <= 5) {
                                                UVEl.setAttribute("style", "background-color: yellow; color: black; border-radius: 5px; width: 50px; padding:5px;")
                                        }
                                        if (UVindex > 5 && UVindex <= 8) {
                                                UVEl.setAttribute("style", "background-color: orange; color: black; border-radius: 5px; width: 50px; padding:5px;")
                                        }
                                        if (UVindex > 8 && UVindex <= 10) {
                                                UVEl.setAttribute("style", "background-color: red; color: black; border-radius: 5px; width: 50px; padding:5px;")
                                        }
                                        else if (UVindex > 11) {
                                                UVEl.setAttribute("style", "background-color: purple; color: white; border-radius: 5px; width: 50px; padding:5px;")
                                        }
                                })
                        }
                });
        return UVApiResponse;
}

var getUserCity = function (cityInput) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + ',&appid=' + apiKey + '&units=imperial'

        fetch(apiUrl)
                .then(function (response) {
                        if (response.ok) {
                                console.log("response OK. response = ", response);
                                response.json().then(function (data) {
                                        console.log("data", data);

                                        cityName = data.city.name;
                                        temp = data.list[0].main.temp;
                                        humidity = data.list[0].main.humidity;
                                        wind = data.list[0].wind.speed;
                                        returnedLat = data.city.coord.lat;
                                        returnedLon = data.city.coord.lon;
                                        description = data.list[0].weather[0].description
                                        descriptionIcon = data.list[0].weather[0].icon
                                        descriptionIcon1 = data.list[7].weather[0].icon
                                        descriptionIcon2 = data.list[15].weather[0].icon
                                        descriptionIcon3 = data.list[23].weather[0].icon
                                        descriptionIcon4 = data.list[31].weather[0].icon
                                        descriptionIcon5 = data.list[39].weather[0].icon

                                        date = data.list[0].dt
                                        date1 = data.list[7].dt
                                        date2 = data.list[15].dt
                                        date3 = data.list[23].dt
                                        date4 = data.list[31].dt
                                        date5 = data.list[39].dt

                                        dateUnix = moment.unix(date)
                                        dateUnix1 = moment.unix(date1)
                                        dateUnix2 = moment.unix(date2)
                                        dateUnix3 = moment.unix(date3)
                                        dateUnix4 = moment.unix(date4)
                                        dateUnix5 = moment.unix(date5)

                                        dateFormatted = moment(dateUnix).format('MM/DD/YYYY')
                                        dateFormatted1 = moment(dateUnix1).format('MM/DD/YYYY')
                                        dateFormatted2 = moment(dateUnix2).format('MM/DD/YYYY')
                                        dateFormatted3 = moment(dateUnix3).format('MM/DD/YYYY')
                                        dateFormatted4 = moment(dateUnix4).format('MM/DD/YYYY')
                                        dateFormatted5 = moment(dateUnix5).format('MM/DD/YYYY')

                                        console.log(dateFormatted)

                                        iconLink = 'http://openweathermap.org/img/wn/' + descriptionIcon + '@2x.png'

                                        iconEl.appendChild(iconImg)
                                        iconImg.src = iconLink
                                        iconEl.setAttribute('style', 'display: inline;')

                                        citySearchTerm.textContent = cityName + " " + dateFormatted

                                        tempEl.textContent = "Temp: " + temp + "\u00B0" + " F";
                                        humidityEl.textContent = "Humidity: " + humidity + "%";
                                        windEl.textContent = "Wind Speed: " + wind + "mph";
                                        descriptionEl.textContent = "Description: " + description

                                        var returnedUV = getUV(returnedLat, returnedLon)
                                        console.log(returnedUV)

                                        var fiveDayCont = document.querySelector('#fiveDayCont')

                                        day1Title.textContent = dateFormatted1
                                        day2Title.textContent = dateFormatted2
                                        day3Title.textContent = dateFormatted3
                                        day4Title.textContent = dateFormatted4
                                        day5Title.textContent = dateFormatted5


                                        day1temp.textContent = "Temp: " + data.list[7].main.temp + "\u00B0" + " F";
                                        day1humidity.textContent = "Humidity: " + data.list[7].main.humidity + "%";
                                        day1wind.textContent = "Wind: " + data.list[7].wind.speed + "mph";
                                        iconLink1 = 'http://openweathermap.org/img/wn/' + descriptionIcon1 + '@2x.png'
                                        day1iconEl.appendChild(iconImg1)
                                        iconImg1.src = iconLink1

                                        day2temp.textContent = "Temp: " + data.list[15].main.temp + "\u00B0" + " F";
                                        day2humidity.textContent = "Humidity: " + data.list[15].main.humidity + "%";
                                        day2wind.textContent = "Wind: " + data.list[15].wind.speed + "mph";
                                        iconLink2 = 'http://openweathermap.org/img/wn/' + descriptionIcon2 + '@2x.png'
                                        day2iconEl.appendChild(iconImg2)
                                        iconImg2.src = iconLink2

                                        day3temp.textContent = "Temp: " + data.list[23].main.temp + "\u00B0" + " F";
                                        day3humidity.textContent = "Humidity: " + data.list[23].main.humidity + "%";
                                        day3wind.textContent = "Wind: " + data.list[23].wind.speed + "mph";
                                        iconLink3 = 'http://openweathermap.org/img/wn/' + descriptionIcon3 + '@2x.png'
                                        day3iconEl.appendChild(iconImg3)
                                        iconImg3.src = iconLink3

                                        day4temp.textContent = "Temp: " + data.list[31].main.temp + "\u00B0" + " F";
                                        day4humidity.textContent = "Humidity: " + data.list[31].main.humidity + "%";
                                        day4wind.textContent = "Wind: " + data.list[31].wind.speed + "mph";
                                        iconLink4 = 'http://openweathermap.org/img/wn/' + descriptionIcon4 + '@2x.png'
                                        day4iconEl.appendChild(iconImg4)
                                        iconImg4.src = iconLink4

                                        day5temp.textContent = "Temp: " + data.list[39].main.temp + "\u00B0" + " F";
                                        day5humidity.textContent = "Humidity: " + data.list[39].main.humidity + "%";
                                        day5wind.textContent = "Wind: " + data.list[39].wind.speed + "mph";
                                        iconLink5 = 'http://openweathermap.org/img/wn/' + descriptionIcon5 + '@2x.png'
                                        day5iconEl.appendChild(iconImg5)
                                        iconImg5.src = iconLink5

                                        fiveDayCont.setAttribute('style', 'display: inline; width: 25%;')

                                        searchList.push(cityName);
                                        localStorage.setItem("searchTerm", JSON.stringify(searchList));

                                        searchHistory()
                                });
                        } else {
                                alert('Error: ' + response.statusText);
                        }
                })
                .catch(function (error) {
                        alert('Unable to connect to Weather API');
                });
};

searchListBtn.addEventListener('submit', previousSearch)
weatherFormEl.addEventListener('submit', formSubmit);
