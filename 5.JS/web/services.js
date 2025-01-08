export function getLocalStorage(key) {
    if (!key) return null;
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
}

export function setLocalStorage(key, value) {
    if (!key || !value) return;
    const dataString = JSON.stringify(value);
    localStorage.setItem(key, dataString);
}

function fetchJSONData(url) {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    });
}

async function fetchAsyncJSONData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}

const DOGS_URL = 'https://dog.ceo/api/breeds/list/all';
const DOG_IMAGE_URL = 'https://dog.ceo/api/breeds/image/random';

export async function getDogBreeds() {
    // Des-estructuración de objetos cambiando el nombre de la propiedad
    const { message: allBreedsData, status } = await fetchJSONData(DOGS_URL);
    if (status !== 'success') {
        throw new Error('Failed to fetch image');
    }
    let breeds = [];
    Object.keys(allBreedsData).forEach((breed) => {
        if (allBreedsData[breed].length > 0) {
            allBreedsData[breed].forEach((subBreed) => {
                const breedObj = {
                    breed: `${subBreed} ${breed}`,
                    urlBreed: `${breed}-${subBreed}`,
                };
                breeds.push(breedObj);
            });
        } else {
            breeds.push({ breed, urlBreed: breed });
        }
    });
    return breeds;
}

export async function getDogImage() {
    const { message, status } = await fetchJSONData(DOG_IMAGE_URL);
    if (status !== 'success') {
        throw new Error('Failed to fetch image');
    }
    return message;
}
