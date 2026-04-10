async function getWeather() {
    const location = document.getElementById("locationInput").value;
    const loader = document.getElementById("loader");
    const result = document.getElementById("weatherResult");

    if (!location) {
        alert("Please enter a location");
        return;
    }

    const apiKey = "41086494d3564da7a16145346261004";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7&aqi=yes`;

    try {
        // SHOW loader
        loader.style.display = "block";
        result.innerHTML = "";

        const response = await fetch(url);
        const data = await response.json();

        // HIDE loader
        loader.style.display = "none";

        if (data.error) {
            result.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }

        let html = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <img src="https:${data.current.condition.icon}">
            <p><strong>${data.current.temp_c}°C</strong></p>
            <p>${data.current.condition.text}</p>
            <h3>7-Day Forecast</h3>
            <div class="forecast">
        `;

        data.forecast.forecastday.forEach(day => {
            html += `
                <div class="day">
                    <p><strong>${day.date}</strong></p>
                    <img src="https:${day.day.condition.icon}">
                    <p>${day.day.avgtemp_c}°C</p>
                    <p>${day.day.condition.text}</p>
                </div>
            `;
        });

        html += `</div>`;
        result.innerHTML = html;

    } catch (error) {
        loader.style.display = "none";
        result.innerHTML = `<p>Something went wrong!</p>`;
    }
}