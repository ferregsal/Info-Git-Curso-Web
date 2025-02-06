import { menuItems } from './header.js';

const html = String.raw;

export function renderDialogNav() {
    const template = html`
        <dialog>
            <p class="close">
                <button class="fa-solid fa-xmark"></button>
            </p>
            <nav class="h5">
                <ul>
                    ${menuItems}
                </ul>
            </nav>
        </dialog>
    `;
    return template;
}
