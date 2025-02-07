import express from 'express';
import createDebug from 'debug';

export const app = express();
const debug = createDebug('demo:app');

debug('Iniciando App...');
app.disable('x-powered-by');
