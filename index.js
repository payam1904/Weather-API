const API_KEY = "aa236e6ad867e25351fbc9e9011019b6";

$(document).ready(function () {
    $("#search-btn").click(function () {
        updateScreen();
    });
});

function get_input() {
    const city = $("#search-input").val();
    return city;
}

function fetchData(city) {
    return new Promise((resolve, reject) => {
        const END_POINT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        fetch(END_POINT)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const weatherInfo = {
                    cityName: data.name,
                    temp: data.main.temp,
                    realFeel: data.main.feels_like,
                    description: data.weather[0].description,
                    icon: data.weather[0].icon
                };
                resolve(weatherInfo);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                reject(error);
            });
    });
}

function updateScreen() {
    const city = get_input();
    fetchData(city)
        .then(data => {
            console.log(data);
            convertedIcon = `http://openweathermap.org/img/wn/${data.icon}.png`
            $(".title").html(data.cityName)
            $(".temperature").html(Math.round(data.temp))
            $(".real-feel").html(`Real Feel: ${Math.round(data.realFeel)}`)
            $("#icon-img").attr('src', convertedIcon)
            $(".description").html(data.description)

            $("#result-box").css("display", "flex")
        })
        .catch(error => {
            // Handle errors from fetchData
            console.error('Error updating screen:', error);
        });
}