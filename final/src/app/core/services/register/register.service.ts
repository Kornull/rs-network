import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RequestsData, UserRegister } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  userSignUp(data: UserRegister) {
    return this.http.post<null>(
      `${RequestsData.URL}${RequestsData.REGISTER}`,
      data
    );
  }
}
