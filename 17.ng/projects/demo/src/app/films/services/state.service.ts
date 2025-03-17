import { computed, inject, Injectable, signal } from '@angular/core';
import { Film } from '../types/film';
import { RepoService } from './repo.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private _films = signal<Film[]>([]);
  private films = computed(() => this._films());
  repo = inject(RepoService);
  constructor() {
    this.repo.loadFilms().subscribe((films) => {
      this._films.set(films);
      console.log(this._films());
    });
  }

  getFilms() {
    return this.films;
  }

  deleteFilm(id: string) {
    // deleteRepo
    this._films.set(this._films().filter((film) => film.id !== id));
  }

  addFilm(film: Omit<Film, 'id'>) {
    this.repo.createFilm(film).subscribe({
      next: (film) => {
        this._films.set([...this._films(), film]);
      },
      error: (error) => {
        console.error('Error creating film', error);
      },
    });
  }

  updateFilm(film: Film) {
    // updateRepo
    this._films.set(
      this._films().map((f) =>
        f.id === film.id
          ? { ...f, title: film.title, releaseYear: film.releaseYear }
          : f,
      ),
    );
  }
}
