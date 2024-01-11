import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  GroupMessageData,
  GroupMessagesDataType,
  UserListPersonalData,
} from '../../store/models';

@Injectable({
  providedIn: 'root',
})
export default class AddUserNameService {
  dialogs$!: Observable<GroupMessagesDataType[]>;

  constructor(private store: Store) {}

  changeIdToName(
    dialog: GroupMessageData[],
    users: UserListPersonalData[]
  ): GroupMessagesDataType[] {
    const usersNamesObj = Object.assign(
      {},
      ...users.map(item => {
        return { [item.uid.S]: item.name.S };
      })
    );

    return [
      ...dialog
        .map((mes): GroupMessagesDataType => {
          return {
            name: usersNamesObj[mes.authorID.S],
            time: mes.createdAt.S,
            message: mes.message.S,
            id: mes.authorID.S,
          };
        })
        .sort((a, b) => +a.time - +b.time),
    ];
  }
}
