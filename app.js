// Connecting OpenWeather API
const apiKey = "e6f49ed854d5001b1dd66ba0594c446e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBar = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city){

    // Avoid making the API call if the city is not defined
    if (!city) return; // If city is not provided, exit the function
    
    // Reset error message before making the API call
    document.querySelector(".error").style.display = "none";

    try {
         // Make an API request to get weather data for the specified city
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        // If the response is not OK (e.g., city not found), throw an error
        if (!response.ok) {
            throw new Error("City/Country Not Found");
        }

        // Parse the JSON response
        const data = await response.json();

        console.log(data);

        // Update the UI with the fetched weather data
        document.querySelector(".city").innerHTML = data.name;
        // Rounds and includes degree symbol
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&deg;F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " MPH";

        // Update weather icon to sync with fetched weather data
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png";
        }
        else {
            weatherIcon.src = "";
        }

    } catch (error) {
        // Log any errors to the console
        console.error("Error fetching weather data: ", error);
        // Update the UI to indicate the city was not found
        document.querySelector(".error").style.display = "block";
    }
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBar.value); // Will get and pass city name to checkWeather() funct
})

checkWeather("Miami"); // Dynamically sets default city