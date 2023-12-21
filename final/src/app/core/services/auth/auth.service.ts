import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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
  private dataUser: string | null = null;

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
    this.store
      .select(selectIsUserLogged)
      .pipe(
        map(res => {
          this.dataUser = localStorage.getItem(LocalStoreKeys.AUTH_USER);
          if (res && this.dataUser === null) {
            this.store.dispatch(LoggedActions.isUserNotFound());
          }
        })
      )
      .subscribe();
    return this.dataUser !== null;
  }
}
