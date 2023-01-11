export default class StorageManager {

    static hasAvailableSpace() {
        return StorageManager.get().length < 10;
    }

    static set(city) {   
        if(!StorageManager.hasAvailableSpace()) {
            return false;
        }

        const cities = JSON.parse(localStorage.getItem('cities'));
        if(!cities){
            localStorage.setItem('cities', JSON.stringify([city]));
            return true;
        }
        else {
            localStorage.setItem('cities', JSON.stringify([...cities, city]));
            return true;
        }
    }

    static get() {
        const cities = JSON.parse(localStorage.getItem('cities'));
        if(Array.isArray(cities))
            return cities;
        else return [];
    }
}
