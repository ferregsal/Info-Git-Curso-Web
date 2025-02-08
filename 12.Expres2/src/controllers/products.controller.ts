import { Request, Response } from 'express';
import { ProductsPage } from '../views/pages/products-page.js';
import { ANIMALS, type Animal } from '../data/mock.js';
import createDebug from 'debug';
import { DetailPage } from '../views/pages/detail-page.js';
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

    getDetailPage = (req: Request, res: Response) => {
        debug('Petición recibida en getDetailPage');
        const { name } = req.params;
        const title = `${name} | Demo Products`;
        const view: DetailPage = new DetailPage(title);
        const data = this.data.find((item) => item.name === name);
        if (!data) {
            res.status(404).send('Not found');
            return;
        }
        res.send(view.render({ mainContent: data }));
    };
}
