import { fetchCities, fetchWeather } from "./fetcher.js";
import StorageManager from "./storageManager.js";

const searchbar = document.querySelector('#searchbar');
const searchbBtn = document.querySelector('#search-btn')
const citiesDataList = document.querySelector('#cities');
const weatherTemp = document.querySelector('#weather-template').content;
const main = document.querySelector('main');
const body = document.querySelector('body');
const wrapper = document.querySelector('#wrapper');

window.onload = () => {
    appendCitiesToDatalist();
    loadCitiesFromStorage();
}

const loadCitiesFromStorage = () => {
    const cities = StorageManager.get();

    for (const city of cities) {
        addWeatherCard(city);
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
    const data = await fetchWeather(city);
    if(data.cod === '404'){
        throw new Error(data.message);
    }
    const clone = weatherTemp.cloneNode(true);
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

const displayError = (errorMessage) => {
    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = errorMessage;
    const btn = document.createElement('button');
    btn.textContent = 'OK';
    btn.addEventListener('click', e => {
        e.target.parentNode.remove();
        wrapper.classList.remove('blur');
    })
    error.appendChild(btn);
    wrapper.classList.add('blur');
    body.appendChild(error);
}

searchbBtn.addEventListener('click', () => {
    const city = searchbar.value;
    console.log('clicked with' , city); 
    StorageManager.hasAvailableSpace() ? 
    addWeatherCard(city)
        .then(city => StorageManager.set(city))
        .catch(error => displayError(error)) 
    : displayError('Error: No space in storage');
})


