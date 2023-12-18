
window.addEventListener('DOMContentLoaded', (event) => {
    // Замените 'YOUR_API_KEY' на ваш собственный API-ключ OpenWeatherMap
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';
    const userInput = 'userInput';
    // Замените 'CITY_NAME' на название города, для которого вы хотите получить прогноз погоды

    const weatherElement = document.getElementById('weather');
    const iconw = document.getElementById('img');
    const cit = document.getElementById('city');
    weatherElement.innerHTML = `${city}`;
    function updateWeather() {
        const city = document.getElementById(userInput).value;
        // // Формируем URL для запроса к API OpenWeatherMap
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        // Отправляем GET-запрос к API
        fetch(url).then((response) => response.json()).then((data) => {

            weatherElement.innerHTML = `${city}`;
            const temperature = data.main.temp;
            const ct = data; // весь объект - результат
            console.log(ct);
            const pressure = data.main.pressure;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const windDir = data.wind.deg;
            console.log(pressure);
            const description = data.weather[0].description;
            const icn = data.weather[0].icon;
            console.log(data.name);


            // const getTime = new Date(data.sys.sunrise); // закат
            // const fullTime = `${getTime.getHours()}: ${getTime.getMinutes()}: ${getTime.getSeconds()}`;
            // console.log(fullTime);

            cit.innerText = data.name + " Страна: " + `${data.sys.country}`;
            // document.getElementById("sunrise").innerHTML = ` Закат: ${fullTime}`;

            iconw.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            let windDirect;
            if (windDir === 0 || windDir === 360) {
                windDirect = 'North';
            } else if (windDir > 0 && windDir < 90) {
                windDirect = 'North-East';
            } else if (windDir === 90) {
                windDirect = 'East';
            } else if (windDir > 90 && windDir < 180) {
                windDirect = 'South-East';
            } else if (windDir === 180) {
                windDirect = 'South';
            } else if (windDir > 180 && windDir < 270) {
                windDirect = 'South-West';
            } else if (windDir === 270) {
                windDirect = 'West';
            } else if (windDir > 270 && windDir < 360) {
                windDirect = 'North-West';
            } else {
                windDirect = 'Unknown'; // Handle any other cases
            }
            weatherElement.innerHTML = `Текущая температура: ${temperature}°C<br>Описание: ${description}<br>Давление: ${pressure} hPa<br>Влажность: ${humidity}%<br>Ветер: ${wind} м/с<br>Направление ветра: ${windDir}° (${windDirect})`;
        })
            .catch((error) => {
                console.error('Произошла ошибка:', error);
            });
    }
    document.getElementById(userInput).addEventListener('input', updateWeather);
    updateWeather();
}); 