import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { RequestsData, UserLogin, UserLoginSuccess } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  auth(data: UserLogin): Observable<UserLoginSuccess> {
    return this.http.post<UserLoginSuccess>(
      `${RequestsData.URL}${RequestsData.LOGIN}`,
      data
    );
  }
}
