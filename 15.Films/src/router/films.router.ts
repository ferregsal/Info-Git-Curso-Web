import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { FilmsController } from '../controllers/films.controller';
import { Repository } from '../repo/repository.type';
import { Film } from '@prisma/client';
import { FilmRepo } from '../repo/films.repository';
import { AppResponse } from '../types/app-response';

export const filmsRouter = Router();

const repoFilms: Repository<Film> = new FilmRepo();
const filmsController = new FilmsController(repoFilms);

filmsRouter.get('/', filmsController.getAll);

filmsRouter.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const film = await repoFilms.readById(id);
    const data: AppResponse<Film> = {
        results: [film],
        error: '',
    };
    res.json(data);
});
filmsRouter.post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        const newData = req.body;
        try {
            const film = await repoFilms.create(newData);
            const data: AppResponse<Film> = {
                results: [film],
                error: '',
            };
            res.json(data);
        } catch (error) {
            next(error);
        }
    },
);
filmsRouter.patch('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const newData = req.body;

    const film = await repoFilms.update(id, newData);
    const data: AppResponse<Film> = {
        results: [film],
        error: '',
    };
    res.json(data);
});

filmsRouter.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const film = await repoFilms.delete(id);
    const data: AppResponse<Film> = {
        results: [film],
        error: '',
    };
    res.json(data);
});
