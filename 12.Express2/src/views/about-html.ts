import { createHeader } from './partials/header.js';
import { createHead } from './partials/head.js';
import { createFooter } from './partials/footer.js';

export const renderAboutHtml = () => {
    const title = 'About us | Cámaras Profesionales';
    const pageTitle = 'Cámaras Profesionales';

    return `
        <!DOCTYPE html>
        <html lang="es">
            ${createHead(title)}
            <body>
                ${createHeader(pageTitle)}
                <section>
                <h2>Nuestros Orígenes</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Molestiae alias odio distinctio qui,
                            cupiditate autem eos? Voluptate beatae molestias
                            dignissimos doloremque similique recusandae porro
                            ducimus perferendis accusamus? Ea, laborum sint.
                        </p>
                        <h2>Localizaciones</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Molestiae alias odio distinctio qui,
                            cupiditate autem eos? Voluptate beatae molestias
                            dignissimos doloremque similique recusandae porro
                            ducimus perferendis accusamus? Ea, laborum sint.
                        </p>
                        <h2>Historia</h2>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Molestiae alias odio distinctio qui,
                            cupiditate autem eos? Voluptate beatae molestias
                            dignissimos doloremque similique recusandae porro
                            ducimus perferendis accusamus? Ea, laborum sint.
                        </p>
                        </section>
                ${createFooter()}
            </body>
        </html>
    `;
};
