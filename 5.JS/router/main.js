import { loadAbout } from './about/about.js';
import { loadPorfolio } from './porfolio/porfolio.js';

// function header(params) {

// }

const headerTemplate = /*html*/ `
 <header>
    <h1>Aprendiendo rutas</h1>
    <nav>
      <ul>
        <li>
          <a href="/index.html">Inicio</a>
        </li>
        <li>
          <a href="/porfolio/porfolio.html">Profolio</a>
        </li>
        <li>
          <a href="/about/about.html">About</a>
        </li>
      </ul>
    </nav>
  </header>
`;

function loadIndex() {
    console.log('Loaded main');
    const page = location.pathname.split('/').at(-1).split('.').at(0);

    document.body.insertAdjacentHTML('afterbegin', headerTemplate);

    switch (page) {
        case 'porfolio':
            loadPorfolio();
            break;
        case 'about':
            loadAbout();
            break;
    }
}

loadIndex();
