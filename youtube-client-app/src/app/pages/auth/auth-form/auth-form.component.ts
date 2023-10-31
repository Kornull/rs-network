import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/localStorage/local-storage.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  hide: boolean = true;

  loginValue: string = '';

  passwordValue: string = '';

  constructor(private localStorageServiceService: LocalStorageService) {}

  onValidate() {}

  onLoggingUser() {
    this.localStorageServiceService.addUserLocalStore({
      login: this.loginValue,
      password: this.passwordValue,
    });
  }
}
