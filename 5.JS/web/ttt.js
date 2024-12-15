export function tttGame() {
    console.log('Loaded tttGame');
    // Declaración de funciones internas (--> métodos)

    function renderSelectPlayers() {
        let template = `<option></option>`;

        playersList.forEach((item, index) => {
            template += `<option value="${index}">${item.alias}</option>`;
        });

        const playersSelectElements = document.querySelectorAll(
            '.select-players select'
        );
        playersSelectElements.forEach((item) => {
            item.innerHTML = template;
        });
    }

    function handleSelectPlayers(event) {
        const target = event.target;
        players[target.dataset.id] = playersList[target.value];
        renderPlayerNames();
        if (players[0] && players[1] && players[0] !== players[1]) {
            document.querySelectorAll('menu button').forEach((button) => {
                button.removeAttribute('disabled');
            });

            target.closest('details').open = false;
        }
    }
    function renderPlayerNames() {
        for (let i = 0; i < ddElements.length; i++) {
            const item = ddElements[i];
            // item.textContent = players[i].alias
            //     ? players[i].alias
            //     : players[i].firstName;

            const text = players[i] ? `<b>${players[i].alias}</b>` : '';

            // item.textContent = text;
            item.innerHTML = text;
        }
    }

    function playTurn(position, playerIndex) {
        ddElements.forEach((item) => {
            item.classList.remove('current-player');
        });
        ddElements[playerIndex].classList.add('current-player');

        const infoElement = document.querySelector('dialog.info');
        // console.dir(boardElement.children[0]);
        // console.dir(boardElements[0]);

        if (boardElement.children[position - 1].textContent) {
            infoElement.lastElementChild.textContent = 'Movimiento inválido';
            infoElement.showModal();
            setTimeout(function () {
                infoElement.lastElementChild.textContent = '';
                infoElement.close();
            }, 500);
            return;
        }

        boardElement.children[position - 1].innerHTML =
            players[playerIndex].icon;

        board[position] = playerIndex;

        const possibleWinner = checkWinner();
        console.log({ board });
        console.log({ possibleWinner });

        if (possibleWinner === null) return;
        infoElement.lastElementChild.textContent =
            possibleWinner === 'empate'
                ? possibleWinner
                : `Ha ganado ${players[possibleWinner].firstName}`;
        infoElement.showModal();

        infoElement.firstElementChild.addEventListener('click', () => {
            infoElement.close();
        });
    }

    // Jugar simulado

    function simulateGame() {
        // Posiciones de 1 a 9
        const delay = 1000;
        setTimeout(() => {
            // Empieza Pepe
            playTurn(5, 0);
            setTimeout(() => {
                // Juega Ernestina (error)
                playTurn(5, 1);
                setTimeout(() => {
                    // Juega Ernestina bien
                    playTurn(4, 1);
                    setTimeout(() => {
                        // Juega Pepe
                        playTurn(3, 0);
                        setTimeout(() => {
                            // Juega Ernestina
                            playTurn(7, 1);
                            setTimeout(() => {
                                // Juega Pepe
                                playTurn(1, 0);

                                setTimeout(() => {
                                    // Juega Ernestina
                                    playTurn(2, 1);

                                    setTimeout(() => {
                                        // Juega Pepe
                                        playTurn(9, 0);
                                    }, delay);
                                }, delay);
                            }, delay);
                        }, delay);
                    }, delay);
                }, delay);
            }, delay);
        }, delay);
    }

    function clearGame() {
        [...boardElement.children].forEach((item) => {
            item.textContent = '';
        });
        ddElements.forEach((item) => {
            item.classList.remove('current-player');
        });
    }

    function handleButtonClick(event) {
        console.log('click', event);
        console.dir(event.target);
        const id = +event.target.dataset.id;
        console.log(id);

        if (id === 0) {
            simulateGame();
        } else {
            clearGame();
        }

        // switch (id) {
        //     case 0:
        //          simulateGame();
        //         break;
        //     case 1:
        //          clearGame();
        //         break;
        // }

        // const functions = [simulateGame, clearGame];
        // functions[id]();
    }

    function checkWinner() {
        const winnerSeries = [
            '123',
            '456',
            '789',
            '147',
            '258',
            '369',
            '159',
            '357',
        ];

        const filteredBoardLength = board.filter((item) => item !== '').length;
        if (filteredBoardLength < 5) return null;

        for (const item of winnerSeries) {
            if (
                board[item[0]] === board[item[1]] &&
                board[item[1]] === board[item[2]] &&
                board[item[0]] !== ''
            ) {
                // !!!! Winner !!!!
                return board[item[0]];
            }
        }

        // winnerSeries.forEach((item) => {
        //     if (
        //         board[item[0]] === board[item[1]] &&
        //         board[item[1]] === board[item[2]] &&
        //         board[item[0]] !== ''
        //     ) {
        //         // !!!! Winner !!!!
        //         return board[item[0]];
        //     }
        // });

        if (filteredBoardLength === board.length) return 'empate';
        return null;
    }

    // Declaración e inicialización de variables

    const playersList = [
        {
            firstName: 'Pepe',
            surname: '',
            alias: 'Pepin',
            icon: '😎',
        },
        {
            firstName: 'Ernestina',
            surname: '',
            alias: 'Erni',
            icon: '👺',
        },
    ];

    const players = [];

    const ddElements = document.querySelectorAll('.players dd');
    const boardElement = document.querySelector('.board');
    // Alternativa: acceder a cada casilla
    // const boardElements = document.querySelectorAll('.board div');

    const board = ['Posiciones en el tablero'];
    for (let i = 1; i < 10; i++) {
        board[i] = '';
        // board.push('')
    }

    // Registro de handlers

    document.querySelectorAll('menu button').forEach((button) => {
        button.addEventListener('click', handleButtonClick);
    });

    // Acciones
    renderSelectPlayers();

    // register después de renderSelectPlayers

    document.querySelectorAll('.select-players select').forEach((item) => {
        item.addEventListener('change', handleSelectPlayers);
    });
}

// TODO

// Algoritmia
// Comprobar si ya hay 3 piezas de un jugador
// Permitir movimientos solo a las casillas vacías y cercanas
// Comprobar si un jugador ganó
// https://www.youtube.com/watch?v=ZbLPTM9lZCY
// Mostrar un mensaje de victoria

// Interacción con el usuario
// Permitir a los jugadores introducir su nombre
// Permitir a los jugadores introducir su icono
// Permitir a los jugadores introducir su alias
// Permitir a los jugadores indicar una posición

// IA
// Crear una IA que juegue automáticamente
