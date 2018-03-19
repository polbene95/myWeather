$(".not-waiting-div").hide();
$(".waiting-div").show();

function getCity() {

    var getCity = $("#search-bar").val();
    $.ajax('http://api.openweathermap.org/data/2.5/forecast?q=' + getCity + '&APPID=013e94b7065991843e6435dd41005e59').done(function (json) {
        data = json;
        console.log(data);
        printInfo();
        $(".not-waiting-div").show();
        $(".waiting-div").hide();
    }).fail(function () {
        $(".not-waiting-div").hide();
        $(".waiting-div").show();

    });

}

function printInfo() {

    var list = data.list;
    var cityName = data.city.name;

    var description = list[0].weather[0].description;
    var humidity = list[0].main.humidity;

    var tempNow = list[0].main.temp - 273.15;
    var tempMax = list[0].main.temp_max - 273.15;
    var tempMin = list[0].main.temp_min - 273.15;

    var tempNowC = tempNow.toString().split(".")[0];
    var tempMaxC = tempMax.toString().split(".")[0];
    var tempMinC = tempMin.toString().split(".")[0];

    $(".degress h1").text(tempNowC + " º")
    $(".city-name h2").text(cityName)
    $(".city-name h4").text(description + " (" + tempMaxC + "º / " + tempMinC + "º )");
    $(".city-name div p").text(humidity);

    extraInfo();
}

function extraInfo() {
    var list = data.list;
    var extraInfo = document.getElementById("extra-info");
    extraInfo.innerHTML="";
    for (let i = 0; i < 9; i++) {

        var mainDiv = document.createElement("div");
        $(mainDiv).addClass("every-time");
        var dateDiv = document.createElement("div");
        var iconDiv = document.createElement("div");
        var tempDiv = document.createElement("div");
        var maxMinDiv = document.createElement("div");
        var windDiv = document.createElement("div");

        var date = list[i].dt_txt;
        var splitDate = date.split(" ")[1];
        var weather = list[i].weather[0].main;

        var temp = list[i].main.temp - 273.15;
        var tempMax = list[i].main.temp_max - 273.15;
        var tempMin = list[i].main.temp_min - 273.15;

        var tempC = temp.toString().split(".")[0];
        var tempMaxC = tempMax.toString().split(".")[0];
        var tempMinC = tempMin.toString().split(".")[0];

        var wind = list[i].wind.speed;

        var icon = document.createElement("i")
        if (weather == "Rain") {
            $(icon).addClass("wi wi-rain")
        }
        if (weather == "Clouds") {
            $(icon).addClass("wi wi-cloud")
        }
        if (weather == "Snow") {
            $(icon).addClass("wi wi-snow")
        }
        if (weather == "Clear") {
            $(icon).addClass("wi wi-day-sunny")
        }

        dateDiv.innerHTML = splitDate;
        iconDiv.append(icon);
        tempDiv.innerHTML = tempC + " º";
        maxMinDiv.innerHTML = tempMaxC + " º/ " + tempMinC + " º";
        windDiv.innerHTML = wind + " m/s";
        mainDiv.append(dateDiv);
        mainDiv.append(iconDiv);
        mainDiv.append(tempDiv);
        mainDiv.append(maxMinDiv);
        mainDiv.append(windDiv);

        $(".extra-info").append(mainDiv);
    }
    $(mainDiv).addClass("last-div");
}

function backgroundSetter() {
    var list = data.list;
    var date = list[0].dt_txt;
    var dateSplit = date.split(" ")[1];
    var timeDate = parseFloat(dateSplit);
    console.log(timeDate);
    if (timeDate < 9) {
        $(".body").css('background-image', 'url("images/barcelona-city-background-1.jpg")');
    }
    if (timeDate > 9) {
        $(".body").css('background-image', 'url("images/barcelona-night-background.jpg")');
    }
}
