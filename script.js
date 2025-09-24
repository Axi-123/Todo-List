const apiKey = "8fc82dec76f220f173f463bc1a04012c"; // Replace with your OpenWeatherMap API key

// Search button click
$("#searchBtn").click(function () {
  let city = $("#cityInput").val();
  if (city !== "") {
    getWeather(city);
  }
});

// Fetch weather data
function getWeather(city) {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Current weather
  $.get(currentWeatherURL, function (data) {
    $("#currentWeather").removeClass("d-none");
    let content = `
      <h5>${data.name}, ${data.sys.country}</h5>
      <p><b>Temperature:</b> ${data.main.temp}°C</p>
      <p><b>Humidity:</b> ${data.main.humidity}%</p>
      <p><b>Condition:</b> ${data.weather[0].main} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"></p>
    `;
    $("#weatherDetails").html(content);
  }).fail(function () {
    alert("City not found. Please try again.");
  });

  // Forecast
  $.get(forecastURL, function (data) {
    $("#forecastTitle").removeClass("d-none");
    $("#forecast").html("");

    // Show one forecast per day at 12:00
    let forecastList = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastList.forEach(day => {
      let date = new Date(day.dt_txt).toLocaleDateString();
      let card = `
        <div class="col-md-2 col-sm-4 col-6">
          <div class="card text-center p-2 shadow">
            <h6>${date}</h6>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="icon">
            <p><b>${day.main.temp}°C</b></p>
            <p>${day.weather[0].main}</p>
          </div>
        </div>
      `;
      $("#forecast").append(card);
    });
  });
}
