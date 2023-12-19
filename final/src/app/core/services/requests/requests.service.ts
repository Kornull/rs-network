import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  GetProfileInfoType,
  GroupMessages,
  GroupsData,
  RequestsData,
  ResponseCreateGroup,
  UsersConversationData,
  UsersData,
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
    return this.http.delete(`${RequestsData.URL}${RequestsData.LOGOUT}`);
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

  getAllUsers(): Observable<UsersData> {
    return this.http.get<UsersData>(
      `${RequestsData.URL}${RequestsData.USER_LIST}`
    );
  }

  getAllUsersDialogs(): Observable<UsersConversationData> {
    return this.http.get<UsersConversationData>(
      `${RequestsData.URL}${RequestsData.USER_CONVERSATION}`
    );
  }

  sendMessageToGroup(message: string, groupId: string) {
    return this.http.post(`${RequestsData.URL}${RequestsData.SEND_MESSAGE}`, {
      groupID: groupId,
      message,
    });
  }

  getMessagesToGroup(
    groupId: string,
    since: string = ''
  ): Observable<GroupMessages> {
    const sinceLink = `&since=${since}`;
    return this.http.get<GroupMessages>(
      `${RequestsData.URL}${RequestsData.GET_MESSAGE}${groupId}${
        since ? sinceLink : ''
      }`
    );
  }
}
