import { fetchCities, fetchWeather } from "./fetcher.js";
import StorageManager from "./storageManager.js";

const searchbar = document.querySelector('#searchbar');
const searchbBtn = document.querySelector('#search-btn')
const citiesDataList = document.querySelector('#cities');
const weatherCard = document.querySelector('.weather');
const main = document.querySelector('main');

window.onload = () => {
    appendCitiesToDatalist();
    loadCitiesFromStorage();
}

const loadCitiesFromStorage = async () => {
    const cities = StorageManager.get();

    for (const city of cities) {
        await addWeatherCard(city);
    }
}

const appendCitiesToDatalist = async () => {
    citiesDataList.textContent = '';
    const data = await fetchCities();
    data.forEach((element) => {
        const option = document.createElement('option');
        option.textContent = element;
        option.value = element;
        citiesDataList.appendChild(option)
    });
}

const addWeatherCard = async (city) => {
    if(!StorageManager.hasAvailableSpace()) return;

    const data = await fetchWeather(city);
    const clone = weatherCard.cloneNode(true);
    clone.querySelector('.city').textContent = data.name;
    clone.querySelector('.temp').innerHTML = parseInt(data.main.temp) + '&deg;C';
    clone.querySelector('.feelslike').innerHTML = 'Feels like: ' + parseInt(data.main.feels_like) + '&deg;C';
    clone.querySelector('.humidity').textContent = 'Humidity: ' + data.main.humidity + '%';
    clone.querySelector('.icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    clone.querySelector('.description').textContent = data.weather[0].main;
    clone.querySelector('.wind').textContent = 'Wind speed: ' + data.wind.speed + 'km/h';
    main.appendChild(clone);
    return data.name;
}


searchbBtn.addEventListener('click', () => {
    const city = searchbar.value;
    console.log('clicked with' , city);
    addWeatherCard(city)
    .then((city) => StorageManager.set(city))
    .catch(() => alert('city not found'));
})


