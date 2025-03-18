import { Component, inject, input } from '@angular/core';
import { Film } from '../../../core/types/film';
import { StateService } from '../../services/state.service';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'cas-film',
  imports: [],
  template: `
    <div>
      <strong>{{ film().title }}</strong> ({{ film().releaseYear }})

      @if (
        userService.currentUser() &&
        (userService.currentUser()?.role === 'ADMIN' ||
          userService.currentUser()?.role === 'EDITOR')
      ) {
        <button (click)="openEdit()">Editar</button>
        <button (click)="sendDelete()">Eliminar</button>
      }
      @if (isEditing) {
        <ng-content></ng-content>
      }
    </div>
  `,
  styles: ``,
})
export class FilmComponent {
  film = input.required<Film>();
  isEditing = false;
  filmsState = inject(StateService);
  userService = inject(UserService);

  sendDelete() {
    const film = this.film() as Film;
    this.filmsState.deleteFilm(film.id);
  }
  openEdit() {
    this.isEditing = !this.isEditing;
  }
}
