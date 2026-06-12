document.getElementById("getWeatherBtn").addEventListener("click", getWeather);
async function getWeather() {
  const location = document.getElementById("locationInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");

  if (!location) {
    weatherResult.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  const apiKey = "fdbe3c154a5c463583650646250911";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  weatherResult.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { temp_c, condition } = data.current;

    weatherResult.innerHTML = `
      <img src="https:${condition.icon}" alt="${condition.text}" />
      <div class="temp">${temp_c}°C</div>
      <div class="condition">${condition.text}</div>
      <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = `<p>❌ ${error.message}</p>`;
  }
}

