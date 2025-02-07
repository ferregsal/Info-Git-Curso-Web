import { resolve } from 'path';
import express from 'express';
import createDebug from 'debug';
import morgan from 'morgan';
import cors from 'cors';
import {
    getAboutController,
    getIndexController,
    getProductsController,
    notFoundController,
} from './controllers.js';
import { logger } from './middleware.js';
import { errorManager } from './errors.js';
// import { renderProductsHtml } from './views/products-html.js';
// import { renderAboutHtml } from './views/about-html.js';

export const app = express();
const debug = createDebug('demo:app');

const __dirname = resolve();
const publicPath = resolve(__dirname, 'public');

debug('Iniciando App...');

app.disable('x-powered-by');

// Middlewares
app.use(cors());
app.use(morgan('common'));
app.use(express.json());
app.use(logger('debugger'));
app.use(express.static(publicPath));

/*
const productos = [
    {
        id: 1,
        nombre: 'Canon-EOS-5d-Mark-IV',
        precio: 190,
        imagen: '/assets/img/Canon-EOS-5d-Mark-IV.jpg',
    },
    {
        id: 2,
        nombre: 'Canon-EOS-6D-Mark-II',
        precio: 250,
        imagen: '/assets/img/Canon-EOS-6D-Mark-II.jpg',
    },
    {
        id: 3,
        nombre: 'Canon-EOS-2000D',
        precio: 340,
        imagen: '/assets/img/Canon-EOS-2000D-copia.jpg',
    },
    {
        id: 4,
        nombre: 'Nikon-D850-1',
        precio: 535,
        imagen: '/assets/img/Nikon-D850-1.jpg',
    },
    {
        id: 5,
        nombre: 'Nikon-d7100',
        precio: 955,
        imagen: '/assets/img/nikon-d7100.jpg',
    },
    {
        id: 6,
        nombre: 'Olympus-E-M10',
        precio: 1350,
        imagen: '/assets/img/Olympus-E-M10.jpg',
    },
];

// Ruta para renderizar productos

 app.get('/products', async (req, res) => {
    try {
        const html = renderProductsHtml(productos);
        res.send(html);
    } catch (err) {
        console.error('Error al cargar la página:', err); // Registrando el error en la consola
        res.status(500).send('Error al cargar la página'); // Enviando una respuesta de error al cliente
    }
});

// Ruta para renderizar a about
app.get('/about', async (req, res) => {
    try {
        const html = renderAboutHtml();
        res.send(html);
    } catch (err) {
        console.error('Error al cargar la página:', err); // Registrando el error en la consola
        res.status(500).send('Error al cargar la página'); // Enviando una respuesta de error al cliente
    }
});
*/

// Rutas
app.get('/', getIndexController);
app.get('/products', getProductsController);
app.get('/about', getAboutController);
app.use('*', notFoundController);
app.use(errorManager);
