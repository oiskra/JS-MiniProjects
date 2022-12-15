const API_KEY = '5786b43150323446c372fc5c6b4db5ba';
const CITY_NAME = 'Cracow';

const cities = async () => {
    const res = await fetch('https://countriesnow.space/api/v0.1/countries');
    return res;
}

const fetchWeather = async() => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=metric&appid=${API_KEY}`);
    return res;
}

fetchWeather()
.then(x => x.json())
.then(x => console.log(x));