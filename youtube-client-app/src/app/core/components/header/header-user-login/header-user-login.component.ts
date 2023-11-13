import { Component, OnInit } from '@angular/core';

import {
  FilterActivateService,
  LocalStorageService,
  LoginService,
  SearchValueService,
} from 'src/app/core/services';
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
    private loginService: LoginService,
    private filterActivateService: FilterActivateService,
    private searchValueService: SearchValueService
  ) {}

  ngOnInit(): void {
    this.loginService.isUserLogged$.subscribe(
      data => (this.isUserLogged = data)
    );
  }

  onLogOut() {
    this.localStorageService.removeToken();
    this.filterActivateService.activatedFilter('');
    this.searchValueService.setValue('');
  }

  getUserName(): string {
    return this.loginService.getUserLogin();
  }
}
