$(".not-waiting-div").hide();
$(".waiting-div").show();
document.getElementById("search-bar").onkeydown = function () {
    if (event.keyCode == 13) {
        getCity();
    };
}

function getCity() {

    var getCity = $("#search-bar").val();
    $.ajax('https://api.openweathermap.org/data/2.5/forecast?q=' + getCity + '&APPID=013e94b7065991843e6435dd41005e59').done(function (json) {
        data = json;
        console.log(data);
        backgroundSetter();
        printInfo();
        $(".not-waiting-div").show();
        $(".waiting-div").hide();
        $("#search-bar").text("");

    }).fail(function () {
        $(".not-waiting-div").hide();
        $(".waiting-div p").text(getCity + " not found");
        $(".waiting-div").show();

    });
}

function printInfo() {

    var list = data.list;
    var cityName = data.city.name;

    var description = list[0].weather[0].description;
    var humidity = list[0].main.humidity;
    var weather = list[0].weather[0].main;

    var tempNow = list[0].main.temp - 273.15;
    var tempMax = list[0].main.temp_max - 273.15;
    var tempMin = list[0].main.temp_min - 273.15;

    //    var icon = createIcon(weather);
    //    icon.classList.add("main-weather-icon");

    var tempNowC = tempNow.toString().split(".")[0];
    var tempMaxC = tempMax.toString().split(".")[0];
    var tempMinC = tempMin.toString().split(".")[0];

    $(".degress h1").text(tempNowC + " º");
    //    $(".degress").append(icon);
    $(".city-name h2").text(cityName);
    $(".city-name h4").text(description + " (" + tempMaxC + "º / " + tempMinC + "º )");
    $(".city-name div p").text(humidity);

    extraInfo();
}

function extraInfo() {
    var list = data.list;
    var extraInfo = document.getElementById("extra-info");
    extraInfo.innerHTML = "";
    for (let i = 0; i < 9; i++) {

        var mainDiv = document.createElement("div");
        $(mainDiv).addClass("every-time");

        var dateDiv = document.createElement("div");
        dateDiv.classList.add("every-time-div");
        dateDiv.classList.add("hide-in-mobil");

        var iconDiv = document.createElement("div");
        iconDiv.classList.add("every-time-div");

        var tempDiv = document.createElement("div");
        tempDiv.classList.add("every-time-div");
        tempDiv.classList.add("hide-in-mobil");

        var maxMinDiv = document.createElement("div");
        maxMinDiv.classList.add("hide-in-mobil");
        maxMinDiv.classList.add("every-time-div");

        var windDiv = document.createElement("div");
        windDiv.classList.add("hide-in-mobil");
        windDiv.classList.add("every-time-div");

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

        var icon = createIcon(weather);

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
    var weather = list[0].weather[0].main;
    var imageUrl = "";
    if (weather == "Rain") {
        imageUrl = "rain.jpg";
    }
    if (weather == "Clouds") {
        imageUrl = "cloud.jpg"
    }
    if (weather == "Snow") {
        imageUrl = "snow.jpg";
    }
    if (weather == "Clear") {
        imageUrl = "sun.jpg";
    }
    $(".body").css('background-image', 'url(/./style/images/' + imageUrl + ')');
}

function createIcon(weather) {
    var icon = document.createElement("i");
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
    return icon;
}
