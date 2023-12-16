import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  GetProfileInfoType,
  GroupsData,
  RequestsData,
  ResponseCreateGroup,
} from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<GetProfileInfoType> {
    return this.http.get<GetProfileInfoType>(
      `${RequestsData.URL}${RequestsData.PROFILE}`
    );
  }

  setUserName(name: string) {
    return this.http.put(`${RequestsData.URL}${RequestsData.PROFILE}`, {
      name,
    });
  }

  profileLogout() {
    return this.http.delete(`${RequestsData.URL}${RequestsData.PROFILE}`);
  }

  getUsersGroups(): Observable<GroupsData> {
    return this.http.get<GroupsData>(
      `${RequestsData.URL}${RequestsData.GROUP_LIST}`
    );
  }

  createGroup(title: string): Observable<ResponseCreateGroup> {
    return this.http.post<ResponseCreateGroup>(
      `${RequestsData.URL}${RequestsData.CREATE_GROUP}`,
      { name: title }
    );
  }

  deleteOwnGroup(groupId: string) {
    return this.http.delete(
      `${RequestsData.URL}${RequestsData.DELETE_GROUP}${groupId}`
    );
  }
}
