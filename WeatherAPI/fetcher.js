const API_KEY = 'e90e0b5a70ccd873175190ae64d3431a';

export const fetchCities = async () => {
     const res = await fetch('https://countriesnow.space/api/v0.1/countries/population/cities')
    .then(x => x.json())
    .then(x => x.data.map(el =>{
        const city = el.city.toLowerCase();
        return city[0].toUpperCase() + city.slice(1);
    }));
    return res;
}

export const fetchWeather = async(city) => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(x => x.json());
    return res;
}