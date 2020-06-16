
var queryURL = "";


$("#citySearchBtn").on("click", function(event) {
    event.preventDefault();
    var city = $("#searchInput").val();
    var newLi = $('<li class="previousCities">');
    newLi.text(city);
    $("#searched-cities").append(newLi);
})

