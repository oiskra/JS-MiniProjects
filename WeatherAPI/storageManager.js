export default class StorageManager {
    static hasAvailableSpace() {
        return StorageManager.get().length < 10;
    }

    static set(city) {
        const cities = JSON.parse(localStorage.getItem('cities'));
        if(!cities)
            localStorage.setItem('cities', JSON.stringify([city]));
        else localStorage.setItem('cities', JSON.stringify([...cities, city]));
    }

    static get() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        if(Array.isArray(cities))
            return cities;
        else return [];
    }
}
