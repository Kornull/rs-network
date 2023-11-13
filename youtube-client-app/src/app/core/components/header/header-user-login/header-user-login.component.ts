import { Component } from '@angular/core';

import { LocalStorageService, LoginService } from 'src/app/core/services';
import { DefaultDataCustomBtn } from 'src/app/core/store';

@Component({
  selector: 'app-header-user-login',
  templateUrl: './header-user-login.component.html',
  styleUrls: ['./header-user-login.component.scss'],
})
export class HeaderUserLoginComponent {
  userBtnStyle: string = DefaultDataCustomBtn.USER;

  constructor(
    private localStorageService: LocalStorageService,
    public loginService: LoginService
  ) {}

  onLogOut() {
    this.localStorageService.removeToken();
  }
}
