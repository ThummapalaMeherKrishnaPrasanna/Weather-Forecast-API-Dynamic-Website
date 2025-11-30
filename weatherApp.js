// fetch("https://api.openweathermap.org/data/2.5/weather?q=London&appid=ab3dc307aad828f48e8b32c4f400523b")
//     .then((result) => result.json())
//     .then((data) => console.log(data));


// enter button code starts
document.getElementById('searchCityName').addEventListener
('keydown', function(e){
    if(e.key === 'Enter'){
       weather();
    }
});
// enter button code ends


async function weather() {
  try {
    const city = document.getElementById("searchCityName").value;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab3dc307aad828f48e8b32c4f400523b`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    } else {
      // converting unreadable boby into json method
      const data = await response.json();
      console.log(data.main.temp);
      console.log(data.main.feels_like);

      const todayDate = new Date().toLocaleDateString();
      document.getElementById("date").innerHTML = todayDate;

      const todayTime = new Date().toLocaleTimeString();
      document.getElementById("time").innerHTML = todayTime;

      // city starts
      const resultCityName = data.name;
      const cityName = document.getElementById("cityName");
      cityName.innerHTML = resultCityName;
      // city ends

      //country starts
      const resultCountryName = data.sys.country;
      const countryName = document.getElementById("countryName");
      countryName.innerHTML = resultCountryName;
      //country ends

      // Temp icon starts
      const icon = data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      document.getElementById("imageIcon").src = iconURL;
      // Temp icon ends

      //Temp & weather starts
      const tempC = data.main.temp - 273.15;
      document.getElementById("tempC").innerHTML = tempC.toFixed(2) + "°C";
      const feelsC = data.main.feels_like - 273.15;
      document.getElementById("feelsC").innerHTML = feelsC.toFixed(2) + "°C";
      const weatherType = data.weather[0].main;
      document.getElementById("weather-Type").innerHTML = weatherType;
      const description = data.weather[0].description;
      document.getElementById("description").innerHTML = description;

      //Temp ends

      //Min & Max Temp starts
      let MinTempC = data.main.temp_min - 273.15;
      document.getElementById("MinTempC").innerHTML =
        MinTempC.toFixed(2) + "°C";

      let MaxTempC = data.main.temp_min - 273.15;
      document.getElementById("MaxTempC").innerHTML =
        MaxTempC.toFixed(2) + "°C";
      //Min & Max Temp ends

      // Humidity starts
      const Humidity = data.main.humidity;
      document.getElementById("Humidity").innerHTML = Humidity + " % ";
      // Humidity ends

      // Pressure starts
      const pressure = data.main.pressure;
      document.getElementById("pressure").innerHTML = pressure + " hpa ";

      // wind
      const wind = data.wind.speed;
      document.getElementById("wind").innerHTML = wind + " m/s ";

      // visibility
      const visibility = data.visibility;
      document.getElementById("visibility").innerHTML = visibility + " m ";

      // sunrise
      let sunriseUnix = data.sys.sunrise;
      let sunriseDate = new Date(sunriseUnix * 1000);
      let sunriseTime = sunriseDate.toLocaleTimeString();
      document.getElementById("sunrise").innerHTML = sunriseTime;

      // sunset
      let sunsetUnix = data.sys.sunset;
      let sunsetDate = new Date(sunsetUnix * 1000);
      let sunsetTime = sunsetDate.toLocaleTimeString();
      document.getElementById("sunset").innerHTML = sunsetTime;

      errorBox.style.display = "none";

      forecast(city);
    }
  } catch (error) {
    errorBox.style.display = "block";
  }
}
// Fetching Forecast API 
async function forecast(city) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ab3dc307aad828f48e8b32c4f400523b&units=metric`
  );

  const data2 = await res.json();

  displayForecast(data2);
}
// Display forecast details 
async function displayForecast(data2) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const dailyData = data2.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  // console.log(dailyData);

  dailyData.forEach((day) => {
    const date = new Date(day.dt_txt);
    const temp = day.main.temp.toFixed(1);
    const desc = day.weather[0].description;
    const icon = day.weather[0].icon;

    const card = `
        <div id="forecast" class="d-flex gap-3 mt-4 flex-wrap justify-content-center" >
            <div class=" p-4 g-3 mb-4 shadow-lg forecast-card-color rounded-2 forecast-card" style="display: block;"> 
                <h6>${date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}</h6>
                <img src = "https://openweathermap.org/img/wn/${icon}@2x.png" width="60">
                <h5>${temp}°C</h5>
                <small>${desc}</small>
            </div>
        </div>

        `;

    forecastDiv.innerHTML += card;
  });
}
