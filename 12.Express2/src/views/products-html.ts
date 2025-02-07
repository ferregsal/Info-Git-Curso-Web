/*import { createHeader } from './partials/header.js';
import { createHead } from './partials/head.js';
import { createFooter } from './partials/footer.js';

export const renderIndexHtml = () => {
    const title = 'Productos | Cámaras Profesionales';
    const pageTitle = 'Productos';

    return `
        <!DOCTYPE html>
        <html lang="es">
            ${createHead(title)}
            <body>
                ${createHeader(pageTitle)}

                <body>
                <h1>Listado de Productos</h1>
                <div class="product-list">
                    {{productos}}
                </div>
                </body>
                ${createFooter()}
            </body>
        </html>
    `;
};
*/
import { createHeader } from './partials/header.js';
import { createHead } from './partials/head.js';
import { createFooter } from './partials/footer.js';

interface Producto {
    imagen: string;
    nombre: string;
    precio: number;
}

export const renderProductsHtml = (productos: Producto[]): string => {
    const title = 'Productos | Cámaras Profesionales';
    const pageTitle = 'Productos';

    const productHTML = productos
        .map(
            (producto: Producto) => `
      <div class="product-card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="product-info">
          <h2>${producto.nombre}</h2>
          <p>Precio: ${producto.precio} €</p>
        </div>
      </div>
    `,
        )
        .join('');

    return `
        <!DOCTYPE html>
        <html lang="es">
            ${createHead(title)}
            <body>
                ${createHeader(pageTitle)}
                <section><h1>Listado de Productos</h1></section>
                <section><div class="product-list">
                    ${productHTML}
                </div></section>
                ${createFooter()}
            </body>
        </html>
    `;
};
