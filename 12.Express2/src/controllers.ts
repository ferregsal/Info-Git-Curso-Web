import type { Request, Response } from 'express';
import createDebug from 'debug';
import { renderIndexHtml } from './views/index-html.js';
import { renderProductsHtml } from './views/products-html.js';
import { productos } from './products.js';
import { renderAboutHtml } from './views/about-html.js';
export const getIndexController = (_req: Request, res: Response) => {
    const debug = createDebug('demo:getController');
    debug('Petición recibida');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderIndexHtml());
};

export const getProductsController = (_req: Request, res: Response) => {
    const debug = createDebug('demo:getController');
    debug('Petición recibida');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderProductsHtml(productos));
};
export const getAboutController = (_req: Request, res: Response) => {
    const debug = createDebug('demo:getController');
    debug('Petición recibida');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(renderAboutHtml());
};

export const postController = (req: Request, res: Response) => {
    const debug = createDebug('demo:postController');
    debug('Datos recibidos');

    // let body = '';

    // request.on('data', (chunk) => {
    //     body += chunk.toString();
    // });

    const data = req.body;
    // Haríamos algo con los datos recibidas
    // const data = JSON.parse(body);

    data.id = crypto.randomUUID();
    const result = {
        message: 'Datos recibidos',
        data,
    };

    res.status(201);
    //response.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.json(result);

    // request.on('end', () => {
    //     // Haríamos algo con los datos recibidas
    //     const data = JSON.parse(body);
    //     data.id = crypto.randomUUID();

    //     const result = {
    //         message: 'Datos recibidos',
    //         data,
    //     };

    //     response.statusCode = 201;
    //     response.setHeader('Content-Type', 'application/json; charset=utf-8');
    //     response.end(JSON.stringify(result));
    // });
};

export const notFoundController = (_req: Request, res: Response) => {
    const debug = createDebug('demo:notFoundController');
    debug('Petición recibida');

    res.status(405);
    res.setHeader('Content.Type', 'text/plain; charset=utf-8');
    res.send('Method not allowed');
};
