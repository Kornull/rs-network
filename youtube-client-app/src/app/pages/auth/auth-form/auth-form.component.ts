import { Component } from '@angular/core';
import { LoginService, LocalStorageService } from 'src/app/core/services';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  hide: boolean = true;

  loginValue: string = '';

  passwordValue: string = '';

  constructor(
    private localStorageServiceService: LocalStorageService,
    private loginService: LoginService
  ) {}

  onValidate() {}

  onLoggingUser() {
    this.localStorageServiceService.addUserLocalStore({
      login: this.loginValue,
      password: this.passwordValue,
    });
    this.loginService.createUser({
      login: this.loginValue,
      password: this.passwordValue,
    });
  }
}
