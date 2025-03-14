import { Component, inject } from '@angular/core';
import { RegisterComponent } from '../user/register/register.component';
import { LoginComponent } from '../user/login/login.component';
import { TimeService } from '../core/services/time.service';

@Component({
  selector: 'cas-home',
  imports: [RegisterComponent, LoginComponent],
  providers: [TimeService],
  template: `
    <h1>Home</h1>
    <p>Esta es la página de inicio</p>
    <cas-register></cas-register>
    <cas-login></cas-login>
    {{ timeService.getTime() }}
  `,
  styles: ``,
})
export default class HomeComponent {
  timeService = inject(TimeService);
}
