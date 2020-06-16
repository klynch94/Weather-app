



function renderWeatherInfo() {
    var city = $("#searchInput").val();
    var queryURL = "";
    console.log(city);
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

