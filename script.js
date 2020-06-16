

function renderWeatherInfo() {
    var city = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
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

$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    $("#cityName").empty();
    $("#weatherData").empty();
    var city = $("#searchInput").val();
    var newLi = $('<li class="previousCities">');
    newLi.attr("data-name", city);
    newLi.text(city);
    $("#searched-cities").append(newLi);
    renderWeatherInfo();
})

