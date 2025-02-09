import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import createDebug from 'debug';

const debug = createDebug('demo:routers:products');
debug('Loaded module');

export const productsRouter = Router();

const controller = new ProductsController();

productsRouter.get('/', controller.getAllPage);
productsRouter.get('/create', controller.getCreatePage);
productsRouter.get('/update/:id', controller.getUpdatePge);
productsRouter.get('/:id', controller.getDetailPage);

productsRouter.post('/create', controller.createProduct);
productsRouter.put('/update/:id', controller.updateProduct);
productsRouter.post('/update/:id', controller.updateProduct);
productsRouter.post('/delete/:id', controller.deleteProduct);
