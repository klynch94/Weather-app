
// event listener for search button. also adds searched city to history..
$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    $("#cityName").empty();
    $("#weatherData").empty();
    $("#cardHolder").empty();
    var city = $("#searchInput").val();
    var newLi = $('<li class="previousCities">');
    newLi.attr("data-name", city);
    newLi.text(city);
    $("#searched-cities").append(newLi);
    renderWeatherInfo();
})



function renderWeatherInfo() {
    var city = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
        console.log(response);
        var name = response.city.name;
        var temp = "Temperature: " + (response.list[0].main.temp) + " °F";
        var humidity = "Humidity: " + response.list[0].main.humidity + "%";
        var windSpeed = "Wind Speed: " + response.list[0].wind.speed + " MPH";
        var cityHeading = $("<h3>");
        cityHeading.text(name);
        $("#cityName").append(cityHeading);
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
                console.log(response.list[i]);
                var dayTemp = "Temperature: " + Math.floor((response.list[i].main.temp)) + " °F";
                console.log(dayTemp);
                var card = $("<div>");
                card.addClass("card");
                var cardBody = $("<div>");
                cardBody.attr("class", "card-body");
                var newP = $("<p>");
                newP.text(dayTemp);
                cardBody.append(newP);
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
            var uvIndex = "UV Index: " + result.value;
            var uvP = $("<p>");
            uvP.text(uvIndex);
            $("#weatherData").append(uvP);
        })

        
        

    })
}



