import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DTOUser, User } from '../../../core/types/user';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'cas-register',
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    @if (user === null) {
      <form [formGroup]="formGroup" (submit)="onSubmit()">
        <label>
          <span>Nombre</span>
          <input type="text" formControlName="firstName" />
        </label>
        @if (
          formGroup.get('firstName')?.touched &&
          formGroup.get('firstName')?.invalid
        ) {
          <p>El nombre es requerido</p>
        }
        <label>
          <span>Apellido</span>
          <input type="text" formControlName="lastName" />
        </label>
        @if (
          formGroup.get('lastName')?.touched &&
          formGroup.get('lastName')?.invalid
        ) {
          <p class="error">El apellido es requerido</p>
        }
        <label>
          <span>Email</span>
          <input type="email" id="email" formControlName="email" />
        </label>

        @if (
          formGroup.get('email')?.touched && formGroup.get('email')?.invalid
        ) {
          <div>
            @if (formGroup.get('email')?.errors?.['required']) {
              <p>El email es requerido</p>
            } @else if (formGroup.get('email')?.errors?.['email']) {
              <p>El email no es válido</p>
            }
          </div>
        }

        <label>
          <span>Avatar</span>
          <input type="file" />
        </label>

        <label>
          <span>Contraseña</span>
          <input type="password" formControlName="password" />
        </label>

        @if (
          formGroup.get('password')?.touched &&
          formGroup.get('password')?.invalid
        ) {
          <div>
            @if (formGroup.get('password')?.errors?.['required']) {
              <p>La contraseña es requerida</p>
            } @else if (formGroup.get('password')?.errors?.['minlength']) {
              <p>La contraseña debe tener al menos 5 caracteres</p>
            }
          </div>
        }
        <p>{{ checkedPasswd }}</p>

        <button type="submit" [disabled]="formGroup.invalid">Registrar</button>
      </form>
    } @else {
      <p>Usuario registrado correctamente</p>
      <pre>
        {{ this.user | json }}
      </pre
      >
    }
  `,
  styles: `
    label {
      display: block;
      margin-bottom: 1rem;
    }
    .error {
      color: red;
      font-size: 0.8rem;
    }
  `,
})
export class RegisterComponent {
  userServices = inject(UserService);
  fb = inject(FormBuilder);
  formGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  checkedPasswd = this.checkPasswd();
  user: User | null = null;

  constructor() {
    this.formGroup.get('password')?.valueChanges.subscribe(() => {
      this.checkedPasswd = this.checkPasswd();
    });
  }

  onSubmit() {
    this.userServices.register(this.formGroup.value as DTOUser).subscribe({
      next: (user) => {
        this.formGroup.reset();
        this.user = user;
      },
      error: (error) => {
        console.error('Error register user', error);
      },
    });
  }

  // formGroup = new FormGroup({
  //   name: new FormControl(''),
  //   email: new FormControl(''),
  // });
  // FormControls -> objetos que representa inputs, checkbox, radio, select
  // FormArray > array de FormControls
  // FormGroup > objeto que contiene FormControls y FormArrays

  checkPasswd() {
    console.log('Checking password');
    const passwd = this.formGroup.get('password');
    return 'Password: ' + passwd?.value;
  }
}
