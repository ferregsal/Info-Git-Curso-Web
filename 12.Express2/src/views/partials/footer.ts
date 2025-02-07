// import { html } from 'lit-html';

export function createFooter() {
    const linksCollection = {
        cas: {
            url: 'https://cursoscastraining.es/cursos-subvencionados/centro-de-formacion-digital-de-san-blas/',
            title: 'CAS Training',
        },
        cfdsb: {
            url: 'https://cursoscastraining.es/cursos-subvencionados/centro-de-formacion-digital-de-san-blas/',
            title: 'Centro de Formación Digital San Blas (CFD-SB)',
            address: ['C. de Arcos de Jalón, 15', 'San Blas', '28037 Madrid'],
        },
        linkedin: {
            url: 'https://www.linkedin.com/in/fernandoregidor/',
            title: 'LinedIn',
            icon: 'fa-brands fa-linkedin',
        },
        github: {
            url: 'https://github.com/ferregsal',
            title: 'GitHub',
            icon: 'fa-brands fa-github',
        },
    };

    const template = `
        <footer>
            <address>
                <span>
                    <a href=${linksCollection.cas.url} target="_blank"
                        >${linksCollection.cas.title}</a
                    >
                </span>
                <span>
                    <a href=${linksCollection.cfdsb.url} target="_blank"
                        >${linksCollection.cfdsb.title}</a
                    >
                </span>
                <span>${linksCollection.cfdsb.address[0]}</span>
                <span>${linksCollection.cfdsb.address[1]}</span>
                <span>${linksCollection.cfdsb.address[2]}</span>
            </address>
          
            <p>
                <small
                    >© 2024 -
                    <a href="mailto:ferregsal@gmail.com"
                        >Fernando Regidor</a
                    ></small
                >
            </p>
            <nav class="inline">
                <ul>
                    <li class="menu-tablet">
                        <a
                            href=${linksCollection.linkedin.url}
                            title="${linksCollection.linkedin.title}"
                            target="_blank"
                        >
                            <i
                                class="fa-brands ${
                                    linksCollection.linkedin.icon
                                }"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </li>
                    <li class="menu-tablet">
                        <a
                            href=${linksCollection.github.url}
                            title="${linksCollection.github.title}"
                            target="_blank"
                        >
                            <i
                                class="fa-brands ${linksCollection.github.icon}"
                                aria-hidden="true"
                            ></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    `;
    return template;
}
