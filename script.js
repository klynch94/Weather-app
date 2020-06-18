var cityArr = [];


// event listener for search button. also adds searched city to history..
$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    var city = $("#searchInput").val().trim().toLowerCase();
    if (cityArr.indexOf(city) === -1) {
    cityArr.push(city);
    localStorage.setItem("cityArr", JSON.stringify(cityArr));
    createCities(city);
    }
    renderWeatherInfo(city);
})

function createCities (city) {
        var newLi = $('<li class="previousCities">');
        newLi.text(city);
        newLi.on("click",function(){
            var city = ($(this).text())
            renderWeatherInfo(city);
        })
        $("#searched-cities").prepend(newLi);
}

function firstLoad () {
    if(localStorage.getItem("cityArr")) {
        cityArr = JSON.parse(localStorage.getItem("cityArr"));
    }
    for (var i=0; i<cityArr.length; i++) {
        createCities(cityArr[i]);
    }
    renderWeatherInfo(cityArr[cityArr.length - 1]);
}


firstLoad();

function renderWeatherInfo(city) {
  
    $("#cityName").empty();
    $("#weatherData").empty();
    $("#cardHolder").empty();

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
        var name = response.city.name;
        var temp = "Temperature: " + (response.list[0].main.temp).toFixed(1) + " °F";
        var humidity = "Humidity: " + response.list[0].main.humidity + "%";
        var windSpeed = "Wind Speed: " + response.list[0].wind.speed + " MPH";
        var cityHeading = $("<h3>");
        var currentDate = $("<h3>");
        var currentIconImg = $("<img>");
        var currentIconURL = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
        currentIconImg.attr("src", currentIconURL);
        cityHeading.text(name);
        currentDate.text(moment.unix(response.list[0].dt).format("MM/DD/YYYY"));
        $("#cityName").append(cityHeading);
        $("#cityName").append(currentDate);
        $("#cityName").append(currentIconImg);
        var tempP = $("<p>");
        tempP.text(temp);
        $("#weatherData").append(tempP);
        var humidP = $("<p>");
        humidP.text(humidity);
        $("#weatherData").append(humidP);
        var windP = $("<p>");
        windP.text(windSpeed);
        $("#weatherData").append(windP);

        // getting data for next 5 days by looking for 12:00:00 on each list
        for(var i=0; i<response.list.length; i++) {
            if(response.list[i].dt_txt.includes("12:00:00")) {
                var nextDay = moment.unix(response.list[i].dt).format("MM/DD/YYYY");
                var dateHeading = $("<h5>");
                var dayTemp = "Temp: " + Math.floor((response.list[i].main.temp)) + " °F";
                var dayHumid = "Humidity: " + response.list[i].main.humidity + "%";
                var iconImg = $("<img>");
                var iconURL = "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png";
                dateHeading.text(nextDay);
                dateHeading.attr("class", "card-title");
                iconImg.attr("src", iconURL);
                var card = $("<div>");
                card.addClass("card");
                var cardBody = $("<div>");
                cardBody.attr("class", "card-body");
                var oneP = $("<p>");
                var twoP = $("<p>");
                oneP.text(dayTemp);
                twoP.text(dayHumid);
                cardBody.append(dateHeading);
                cardBody.append(iconImg);
                cardBody.append(oneP);
                cardBody.append(twoP);
                card.append(cardBody);
                $("#cardHolder").append(card);
            }
        }

        // calling UV api
        var lat = response.city.coord.lat;
        var long = response.city.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + long;

        $.ajax({
            url: uvURL,
            method: 'GET',
        }).then(function(result) {
            var uvIndex = "UV Index: ";
            var uvResult = result.value;
            var uvDiv = $("<div>");
            var uvResultDiv = $("<div>");
            uvResultDiv.attr("class", "uvDivs");
            uvDiv.attr("class", "uvDivs");
            uvResultDiv.text(uvResult);
            uvDiv.text(uvIndex);
            $("#weatherData").append(uvDiv);
            $("#weatherData").append(uvResultDiv);
            uvResultDiv.attr("id", "uvBox");
            if(uvResult <= 3) {
                uvResultDiv.attr("class", "uvDivs uvLow");
            } else if (uvResult <= 7) {
                uvResultDiv.attr("class", "uvDivs uvMed");
            } else if(uvResult <= 13) {
                uvResultDiv.attr("class", "uvDivs uvHigh");
            }
        })

        
        

    }).catch(function(error) {
        if($("#searchInput").val().length > 0) {
            alert("city not found")
            var duplicate = $("#searchInput").val()
            cityArr.splice(cityArr.indexOf(duplicate), 1);
            localStorage.setItem("cityArr", JSON.stringify(cityArr));

            location.reload();
        }
    })
}



