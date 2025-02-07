import type { Request, Response } from 'express';
import createDebug from 'debug';
import { HomePage } from '../views/pages/home-page.js';

export class HomeController {
    static page = HomePage;
    static getPage = (_req: Request, res: Response) => {
        const debug = createDebug('demo:HomeController');
        debug('Petición recibida');
        res.header('Content-Type', 'text/html');
        res.send(this.page.render());
    };
}
