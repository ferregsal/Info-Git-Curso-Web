import { getDogBreeds, getDogImage } from '../../services.js';

export async function canisGame() {
    console.log('Loaded canisGame');

    function parseDogBreedFromImage(url) {
        const breed = url.split('/')[4];
        return breed;
    }

    // Utility function to shuffle the order of items in an array in-place
    function shuffleArray(array) {
        return array.sort((a, b) => Math.random() - 0.5);
    }

    // Select the correct breed and 2 random breeds
    async function prepareDogsData(randomDog) {
        // Get all breeds
        const breeds = await getDogBreeds();
        // Parse the breed from the image URL
        const selectedBreedName = parseDogBreedFromImage(randomDog);
        // Add the correct breed (the one from the image)
        // to the selectedBreeds array
        const selectedBreeds = [];
        selectedBreeds[0] = breeds.find(
            (breed) => breed.urlBreed === selectedBreedName
        );
        selectedBreeds[0].valid = true;
        // Add 2 random breeds (different from the correct one)
        while (selectedBreeds.length < 3) {
            const randomIndex = Math.floor(Math.random() * breeds.length);
            const randomBreed = breeds[randomIndex];
            if (!selectedBreeds.includes(randomBreed)) {
                randomBreed.valid = false;
                selectedBreeds.push(randomBreed);
            }
        }
        return shuffleArray(selectedBreeds);
    }

    function clearGame() {
        document.querySelector('.canis figure img').outerHTML = '';
        document.querySelector('.canis menu.options').innerHTML = '';
    }

    function renderGame() {
        // Render the game
        document.querySelector('.canis figure').insertAdjacentHTML(
            'beforeend',
            `<img src="${randomDogImage}" 
                alt="Random dog" />`
        );

        const popover = document.querySelector('.popover');
        const buttons = selectedBreeds
            .map(
                (option) =>
                    `<button popovertarget="img-popover">${option.breed}</button>`
            )
            .join('');

        document
            .querySelector('.canis menu.options')
            .insertAdjacentHTML('beforeend', buttons);

        document.querySelectorAll('.canis button').forEach((button) => {
            button.addEventListener('click', (event) => {
                const selectedBreed = selectedBreeds.find(
                    (dog) => dog.breed === event.target.textContent
                );
                const message = selectedBreed.valid
                    ? 'Has acertado!'
                    : 'Inténtalo de nuevo!';
                popover.firstElementChild.textContent = message;

                // Reload the game
                //clearGame();
                //canisGame();
            });
        });
    }

    // Get a random dog image
    const randomDogImage = await getDogImage();
    // Select the correct breed and 2 random breeds
    const selectedBreeds = await prepareDogsData(randomDogImage);

    console.log(randomDogImage);
    console.log(selectedBreeds);

    renderGame();
}
