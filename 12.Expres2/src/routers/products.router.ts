import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import createDebug from 'debug';

const debug = createDebug('demo:routers:products');
debug('Loaded module');

export const productsRouter = Router();

const controller = new ProductsController();

productsRouter.get('/', controller.getAllPage);
productsRouter.get('/create', controller.getCreatePage);
productsRouter.get('/update/:name', controller.getUpdatePge);
productsRouter.get('/:name', controller.getDetailPage);

productsRouter.post('/create', controller.createProduct);
productsRouter.put('/update/:name', controller.updateProduct);
productsRouter.post('/update/:name', controller.updateProduct);
