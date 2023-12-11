import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { RequestsData, UserRegister } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  data: UserRegister = {
    email: 'asfg@mai.rr',
    name: 'Wassser',
    password: '12!@WSsaddW',
  };

  reg() {
    return this.http
      .post<UserRegister>(
        `${RequestsData.URL}${RequestsData.REGISTER}`,
        this.data
      )
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }
}
