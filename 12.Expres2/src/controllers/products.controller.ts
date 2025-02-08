import { Request, Response } from 'express';
import { ProductsPage } from '../views/pages/products-page.js';
import { ANIMALS, type Animal } from '../data/mock.js';
import createDebug from 'debug';
const debug = createDebug('demo:controllers:products');
debug('Loaded module');

export class ProductsController {
    debug = createDebug('Run getPAge');
    data: Animal[] = ANIMALS;

    getAllPage = (req: Request, res: Response) => {
        debug('Petición recibida en getAllPage');
        const view: ProductsPage = new ProductsPage();
        res.send(view.render({ mainContent: this.data }));
    };
}
