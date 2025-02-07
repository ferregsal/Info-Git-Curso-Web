import { renderHeader } from '../partials/header.js';
import { renderHead } from '../partials/head.js';
import { renderFooter } from '../partials/footer.js';
import { renderDialogNav } from '../partials/dialog-nav.js';
import { BasePage } from './base-page.js';

const html = String.raw;

export class HomePage extends BasePage {
    static override render = () => {
        const title = 'Inicio | Demo Products';
        const pageTitle = 'Products';

        return html`
            <!DOCTYPE html>
            <html lang="en">
                ${renderHead(title)}
                <body>
                    ${renderHeader(pageTitle)} ${renderDialogNav()}
                    <main>
                        ${this.renderMain(
                            'Página de inicio',
                            'Bienvenido a la página de inicio',
                        )}
                    </main>
                    ${renderFooter()}
                </body>
            </html>
        `;
    };
}
