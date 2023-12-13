import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetProfileInfoType, RequestsData } from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<GetProfileInfoType> {
    return this.http.get<GetProfileInfoType>(
      `${RequestsData.URL}${RequestsData.PROFILE}`
    );
  }
}
