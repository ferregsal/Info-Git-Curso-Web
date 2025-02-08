import type { Animal } from '../../data/mock';
import { BasePage } from './base-page.js';
import createDebug from 'debug';

const debug = createDebug('demo:views:products-page');
debug('Loaded module');

const html = String.raw;

type PageContent = {
    mainTitle: string;
    mainContent: Animal[];
};

export class ProductsPage extends BasePage {
    constructor(protected title = 'Animals | Demo Products') {
        super(title);
    }

    override renderMain({ mainTitle, mainContent }: PageContent) {
        debug('Iniciando renderMain');
        const renderList = (data: Animal[]) => {
            return data
                .map(
                    (item) => html`
                        <a href="/products/${item.name}">
                            <article>
                                <h3>${item.name}</h3>
                                <p>
                                    <img
                                        src="${item.image}"
                                        alt="${item.name}"
                                    />
                                </p>
                                <div>
                                    <button>Editar</button>
                                    <button>Eliminar</button>
                                </div>
                            </article>
                        </a>
                    `,
                )
                .join(' ');
        };
        return html`
            <main>
                <section class="products">
                    <header>
                        <h2 class="h3">${mainTitle}</h2>
                        <button>Agregar</button>
                    </header>
                    <div class="products-wrapper">
                        ${renderList(mainContent)}
                    </div>
                </section>
            </main>
        `;
    }

    override render(info?: Partial<PageContent>) {
        debug('Iniciando render');
        if (!info) return super.render();
        info.mainTitle = 'Animals';
        info.mainContent = info.mainContent as Animal[];
        return super.render(info);
    }
}
