import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  distinctUntilChanged,
  map,
  take,
  takeUntil,
  tap,
  timeout,
} from 'rxjs';
import { Store } from '@ngrx/store';

import { LoggedActions, selectIsUserLogged } from '../../store/redux';

import {
  LocalStoreKeys,
  RequestsData,
  UserLogin,
  UserLoginSuccess,
} from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private isRegister: boolean = false;

  constructor(
    private http: HttpClient,
    private store: Store
  ) {}

  auth(data: UserLogin): Observable<UserLoginSuccess> {
    return this.http.post<UserLoginSuccess>(
      `${RequestsData.URL}${RequestsData.LOGIN}`,
      data
    );
  }

  isLoggedUser() {
    const dataUser = localStorage.getItem(LocalStoreKeys.AUTH_USER);
    this.store
      .select(selectIsUserLogged)
      .pipe(
        map(res => {
          if (res && dataUser === null) {
            this.store.dispatch(LoggedActions.isUserNotFound());
          }
        })
      )
      .subscribe();
    return dataUser !== null;
  }
}
