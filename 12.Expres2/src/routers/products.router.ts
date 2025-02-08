import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import createDebug from 'debug';

const debug = createDebug('demo:routers:products');
debug('Loaded module');

export const productsRouter = Router();

const controller = new ProductsController();

productsRouter.get('/', controller.getAllPage);
