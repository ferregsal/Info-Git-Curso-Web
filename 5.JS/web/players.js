export function gamePlayers() {
    console.log('Loaded gamePlayers');
    const players = [
        {
            firstName: 'Jorge',
            surname: 'García',
            alias: 'JorgeG',
            icon: '🤓',
        },
    ];

    function validateAlias(event) {
        const aliasElement = event.target;
        console.log('Blur validation atlas');
        if (players.find((player) => player.alias === aliasElement.value)) {
            aliasElement.setCustomValidity('Este alias ya está en uso');
        } else {
            aliasElement.setCustomValidity('');
        }
    }

    function handleSetUsers(event) {
        event.preventDefault();
        const form = event.target;

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

    const detailsElement = document.querySelector('details');
    const registerFormElement = document.querySelector('.players form');
    registerFormElement.addEventListener('submit', handleSetUsers);

    document
        .querySelector('input[name="nickname"]')
        .addEventListener('blur', validateAlias);

    function renderPlayers() {
        const dlElement = document.querySelector('.players dl');
        let template = '';
        players.forEach((player, i) => {
            template += `
                <div>
                    <dt>${player.firstName} ${player.surname}</dt>
                    <dd>${player.alias}</dd>
                    <dd>${player.icon}</dd>
                    <button title="borrar" data-alias="${player.alias}" data-index="${i}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
        });
        dlElement.innerHTML = template;
    }

    renderPlayers();
}
