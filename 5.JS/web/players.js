import { getLocalStorage, setLocalStorage } from './services.js';

export function gamePlayers() {
    console.log('Loaded gamePlayers');
    const players = getLocalStorage('players') || [];
    let isAliasValidated = false;

    function validateAlias(event) {
        const aliasElement = event.target;
        if (event.type === 'input') {
            console.log('Input validation alias');
            aliasElement.setCustomValidity('');
            return;
        }
        console.log('Blur validation alias');
        if (!aliasElement.value) {
            console.log(aliasElement.validity);
            return;
        }
        if (isAliasValidated) {
            console.log('Alias ya validado, permitir blur');
            isAliasValidated = false;
            return;
        }
        if (players.find((player) => player.alias === aliasElement.value)) {
            aliasElement.setCustomValidity('Este alias ya está en uso');
            console.log('Creando custom error', aliasElement.validationMessage);
            isAliasValidated = true;
            aliasElement.reportValidity();
        } else {
            aliasElement.setCustomValidity('');
        }
    }

    function handleSetUsers(event) {
        const form = event.target;
        // validateAlias({
        //     target: form.elements.namedItem('nickname'),
        //     type: event.type,
        // });
        event.preventDefault();

        // Diversas formas de obtener el elemento details
        // const detailsElement = document.querySelector('details');
        // const detailsElement = form.closest('details');
        const detailsElement = form.parentElement;

        /* Datos a partir de form.elements */

        // players.push({
        //     firstName: form.elements[0].value,
        //     surname: form.elements[1].value,
        //     alias: form.elements[2].value,
        //     icon: form.elements[3].value,
        // });

        // players.push({
        //     firstName: form.elements.namedItem('first-name').value,
        //     surname: form.elements.namedItem('surname').value,
        //     alias: form.elements.namedItem('nickname').value,
        //     icon: form.elements.namedItem('icon').value,
        // });

        /* Form Data */

        const formData = new FormData(form);
        const playerData = Object.fromEntries(formData);
        const player = {
            firstName: playerData['first-name'],
            surname: playerData['surname'],
            alias: playerData['nickname'],
            icon: playerData['icon'],
        };
        players.push(player);

        console.log(players);
        form.reset();
        detailsElement.open = false;
        renderPlayers();
    }

    function handleDeletePlayer(event) {
        // Des-estructuración de objetos
        // const alias = event.target.dataset.alias;
        // const index = event.target.dataset.index;
        const { alias, index } = event.target.dataset;
        console.dir(event);
        console.log(alias, index);
        if (players[index].alias !== alias) {
            return;
        }
        players.splice(index, 1);
        renderPlayers();
    }

    function renderPlayers() {
        const dlElement = document.querySelector('.players dl');
        let template = '';
        setLocalStorage('players', players);
        players.forEach((player, i) => {
            template += `
                <div>
                    <dt>${player.firstName} ${player.surname}</dt>
                    <dd>${player.alias}</dd>
                    <dd>${player.icon}</dd>
                    <button title="borrar">
                        <i class="fa-solid fa-trash" data-alias="${player.alias}" data-index="${i}"></i>
                    </button>
                </div>
            `;
        });
        dlElement.innerHTML = template;

        // Después del render se registran los eventos de los botones de borrar

        document.querySelectorAll('.players dl button').forEach((button) => {
            button.addEventListener('click', handleDeletePlayer);
        });
    }

    function handleLoadMock(event) {
        const button = event.target;
        players.length = 0;
        players.push(
            {
                firstName: 'Pepe',
                surname: 'Pérez',
                alias: 'Pepe',
                icon: '😎',
            },
            {
                firstName: 'Ernestina',
                surname: 'Gómez',
                alias: 'Erni',
                icon: '👺',
            },
            {
                firstName: 'Luisa',
                surname: 'López',
                alias: 'Luisa',
                icon: '🤖',
            },
            {
                firstName: 'Jorge',
                surname: 'García',
                alias: 'Jorge',
                icon: '🤓',
            }
        );
        const detailsElement = button.closest('details');
        detailsElement.open = false;
        renderPlayers();
    }

    document
        .querySelector('.players form')
        .addEventListener('submit', handleSetUsers);

    document
        .querySelector('button[type="button"]')
        .addEventListener('click', handleLoadMock);

    document
        .querySelector('input[name="nickname"]')
        .addEventListener('blur', validateAlias);
    document
        .querySelector('input[name="nickname"]')
        .addEventListener('input', validateAlias);

    renderPlayers();
}
