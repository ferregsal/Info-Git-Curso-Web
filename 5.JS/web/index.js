import { createDialogNav } from './components/dialog-nav.js';
import { createFooter } from './components/footer.js';
import { createHeader, startHeader } from './components/header.js';
import { gamePlayers } from './players.js';
import { tttGame } from './ttt.js';
import { quizGame } from './quiz.js';
import { quizGamePlus } from './quiz+.js';
import { canisGame } from './pages/canis/canis.js';

console.log('Index loaded');

// function greeting() {

// const question = '¿Como te llamas?'
//     const userName = prompt(question)
//     if(userName === null || userName === '')  return
//     const response = `Hola, ${userName}, que tal estas`
//     alert(response)

//     // if(userName !== null) {
//     //     const response = `Hola, ${userName}, que tal estas`
//     //     alert(response)
//     // }
// }

// const button = document.querySelector('form button')
// button.addEventListener('click', greeting)

function checkDOM() {
    // El DOM como "árbol" de objetos
    console.dir(document);

    // Acceso secuencial a cualquier nodo
    console.dir(document.children[0].children[1].children[0].children[1]);

    // Acceso directo buscando un nodo: API selectors
    const headerElement = document.querySelector('header');
    console.dir(headerElement.querySelectorAll('img'));

    document.querySelector('#header1');
    document.querySelectorAll('p');
    document.querySelectorAll('.basic');
    document.querySelectorAll('[name="valor de name"]');
    document.querySelector('article>p.header');

    // Acceso directo "previo"
    document.getElementById('header1');
    document.getElementsByTagName('p');
    document.getElementsByClassName('basic');
    document.getElementsByName('valor de name');
}

// Pseudo-componentes que construyen el layout de todas las páginas

const title = 'Juegos';
document.body.insertAdjacentHTML('afterBegin', createHeader(title));
document.body.insertAdjacentHTML('afterBegin', createDialogNav());
document.body.insertAdjacentHTML('beforeEnd', createFooter());

startHeader();

// detección de la página actual

// const currentPage = document.querySelector('main').dataset.page;
// const currentPage = location.pathname.split('/').pop().split('.')[0];

const currentPathNameEnd = location.pathname.split('/').at(-1);
const currentPage = currentPathNameEnd
    ? currentPathNameEnd.split('.')[0]
    : 'index';

switch (currentPage) {
    case 'players':
        console.log('players');
        console.log({ currentPage });
        gamePlayers();
        break;
    case 'ttt':
        console.log('ttt');
        console.log({ currentPage });
        tttGame();
        break;
    case 'quiz':
        console.log('quiz');
        console.log({ currentPage });
        quizGame();
        break;
    case 'quiz+':
        console.log('quiz');
        console.log({ currentPage });
        quizGamePlus();
        break;
    case 'canis':
        console.log('canis');
        console.log({ currentPage });
        canisGame();
        break;
    case 'index':
    case 'home':
    default:
        console.log('index');
        console.log({ currentPage });
        break;
}

function checkDOMAttributes() {
    const elementButton = document.querySelector('.test button');
    elementButton.setAttribute('class', 'some-class');
    //html: <button disabled></button>
    // DOM: disabled=true
    // DOM attributes:
    //      0: disabled
    //      disabled: disabled
    // elementButton.disabled = true;
    // html: <button disabled></button>
    // DOM: disabled=true
    // DOM attributes:
    //      0: disabled
    //      disabled: disabled
    console.dir(elementButton);
    console.log('disable', elementButton.disabled);
    console.log('attributes', elementButton.attributes);

    elementButton.removeAttribute('disabled');
    // // elementButton.disabled = false;
    // console.log('disable', elementButton.disabled);
    // console.log('attributes', elementButton.attributes);
}
