// temp
// humidity
// wind Speed
// UV index




function renderWeatherInfo() {
    var city = $("#searchInput").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: 'GET',
    }).then(function(response) {
        var name = response.city.name;
        var cityHeading = $("<h3>");
        cityHeading.text(name);
        $("#cityName").append(cityHeading);
        var temp = "Temperature: " + (response.list[0].main.temp) + " °F";
        var tempP = $("<p>");
        tempP.text(temp);
        $("#weatherData").append(tempP);
    })
}

$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    var city = $("#searchInput").val();
    var newLi = $('<li class="previousCities">');
    newLi.attr("data-name", city);
    newLi.text(city);
    $("#searched-cities").append(newLi);
    renderWeatherInfo();
})

