import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectGetUsers } from '../../store/redux/dialog.selectors';
import {
  GroupMessageData,
  GroupMessagesDataType,
  UserDataInfo,
  UserListPersonalData,
} from '../../store/models';
import { Observable, map, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddUserNameService {
  dialogs$!: Observable<GroupMessagesDataType[]>;

  constructor(private store: Store) {}

  changeIdToName(dialog: GroupMessageData[], users: UserListPersonalData[]) {
    const usersNamesObj = Object.assign(
      {},
      ...users.map(item => {
        return { [item.uid.S]: item.name.S };
      })
    );

    return dialog.map((mes): GroupMessagesDataType => {
      return {
        name: usersNamesObj[mes.authorID.S],
        time: mes.createdAt.S,
        message: mes.message.S,
        id: mes.authorID.S,
      };
    });
  }
  // this.store.select(selectGetUsers).pipe(
  //   mergeMap(data => {
  //     const objNames = Object.assign(
  //       {},
  //       ...data.map(item => {
  //         return { [item.uid.S]: item.name.S };
  //       })
  //     );
  //     console.log(
  //       'MESSAGEF',
  //       dialog.map((mes): GroupMessagesDataType => {
  //         return {
  //           name: objNames[mes.authorID.S],
  //           time: mes.createdAt.S,
  //           message: mes.message.S,
  //           id: mes.authorID.S,
  //         };
  //       })
  //     );
  //     return dialog.map((mes): GroupMessagesDataType => {
  //       return {
  //         name: objNames[mes.authorID.S],
  //         time: mes.createdAt.S,
  //         message: mes.message.S,
  //         id: mes.authorID.S,
  //       };
  //     });
  //   })
  // )
  //  {
  // return { [item.uid.S]: item.name.S })
  // ));
  // const usersObj = Object.assign(
  //   {},
  //   ...state.users.Items.map(item => {
  //     return { [item.uid.S]: item.name.S };
  //   })
  // );
}
