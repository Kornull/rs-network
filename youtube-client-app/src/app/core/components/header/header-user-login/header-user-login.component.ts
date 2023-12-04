import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  FilterActivateService,
  LocalStorageService,
  LoginService,
  SearchValueService,
} from 'src/app/core/services';
import { DefaultDataCustomBtn } from 'src/app/core/store';
import { cardsVideoActions } from 'src/app/core/store/redux';

@Component({
  selector: 'app-header-user-login',
  templateUrl: './header-user-login.component.html',
  styleUrls: ['./header-user-login.component.scss'],
})
export class HeaderUserLoginComponent implements OnInit {
  userBtnStyle: string = DefaultDataCustomBtn.USER;

  isUserLogged: boolean = false;

  constructor(
    private router: Router,
    private store: Store,
    private localStorageService: LocalStorageService,
    private loginService: LoginService,
    private filterActivateService: FilterActivateService,
    private searchValueService: SearchValueService
  ) {}

  ngOnInit(): void {
    this.loginService
      .getIsLoggedUser()
      .subscribe(isLogged => (this.isUserLogged = isLogged));
  }

  onLogOut() {
    this.store.dispatch(cardsVideoActions.clearStore());
    this.localStorageService.removeToken();
    this.filterActivateService.activatedFilter('');
    this.searchValueService.setValue('');
  }

  getUserName(): string {
    return this.loginService.getUserLogin();
  }

  goAdminPage() {
    this.router.navigate(['/main/admin']);
  }

  goFavoritePage() {
    this.router.navigate(['/main/favorite']);
  }
}
