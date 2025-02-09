import { NextFunction, Request, Response } from 'express';
import { ProductsPage } from '../views/pages/products/products-page.js';
import { ANIMALS, type Animal } from '../data/mock.js';
import createDebug from 'debug';
import { DetailPage } from '../views/pages/products/detail-page.js';
import { UpsertProductsPage } from '../views/pages/products/upsert-page.js';
import { HttpError } from '../errors/http-error.js';
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

    private getProduct = (name: string) => {
        const data = this.data.find((item) => item.name === name);
        if (!data) {
            const error = new HttpError(
                `Product ${name} not found`,
                404,
                'Not Found',
            );
            throw error;
        }
        return data;
    };

    private showDetailPage = (item: Animal, res: Response) => {
        const title = `${item.name} | Demo Products`;
        const view: DetailPage = new DetailPage(title);
        res.send(view.render({ mainContent: item }));
    };

    getDetailPage = (req: Request, res: Response, next: NextFunction) => {
        debug('Petición recibida en getDetailPage');
        const { name } = req.params;
        try {
            const data = this.getProduct(name);
            this.showDetailPage(data, res);
        } catch (error) {
            next(error as HttpError);
        }
    };

    getCreatePage = (req: Request, res: Response) => {
        debug('Petición recibida en createPage');
        const title = `Create | Demo Products`;
        const view: UpsertProductsPage = new UpsertProductsPage(title);
        res.send(view.render());
    };

    getUpdatePge = (req: Request, res: Response, next: NextFunction) => {
        debug('Petición recibida en updatePage');
        const { name } = req.params;
        try {
            const data = this.getProduct(name);
            const title = `${name} update | Demo Products`;
            const view: UpsertProductsPage = new UpsertProductsPage(title);
            const page = view.render({ mainContent: data });
            res.send(page);
        } catch (error) {
            next(error as HttpError);
        }
    };

    createProduct = (req: Request, res: Response) => {
        debug('Petición POST recibida en createProduct');
        const data = req.body;
        this.data.push(data);
        this.showDetailPage(data, res);
    };

    updateProduct = (req: Request, res: Response, next: NextFunction) => {
        debug('Petición PUT recibida en updateProduct');
        const { name } = req.params;
        const data = { ...req.body, name };
        try {
            const index = this.data.findIndex((item) => item.name === name);
            if (index < 0) {
                const error = new HttpError(
                    `Product ${name} not found`,
                    404,
                    'Not Found',
                );
                throw error;
            }
            console.log(data);
            this.data[index] = data;
            this.showDetailPage(data, res);
        } catch (error) {
            next(error as HttpError);
        }
    };
}
