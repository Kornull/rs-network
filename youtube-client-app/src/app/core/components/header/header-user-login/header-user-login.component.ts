import { Component, OnInit } from '@angular/core';

import { LocalStorageService, LoginService } from 'src/app/core/services';
import { DefaultDataCustomBtn } from 'src/app/core/store';

@Component({
  selector: 'app-header-user-login',
  templateUrl: './header-user-login.component.html',
  styleUrls: ['./header-user-login.component.scss'],
})
export class HeaderUserLoginComponent implements OnInit {
  userBtnStyle: string = DefaultDataCustomBtn.USER;

  isUserLogged: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.isUserLogged$.subscribe(
      data => (this.isUserLogged = data)
    );
  }

  onLogOut() {
    this.localStorageService.removeToken();
  }

  getUserName(): string {
    return this.loginService.getUserLogin();
  }
}
