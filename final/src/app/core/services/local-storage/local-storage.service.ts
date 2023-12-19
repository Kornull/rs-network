import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RequestsData, UserLogin } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  data: UserLogin = {
    email: 'assaaaaaaaaaaafg@mai.rr',
    password: '12!@WSsaddW',
  };

  auth() {
    return this.http
      .post<UserLogin>(`${RequestsData.URL}${RequestsData.LOGIN}`, this.data)
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }
}
