import { createSelector } from '@ngrx/store';
import { selectAuthState } from './user.selectors';
import { GroupMessageData, UserListPersonalData } from '../models';

export const selectGroupMessages = (props: { groupId: string }) =>
  createSelector(selectAuthState, (state): GroupMessageData[] => {
    return state.dialogs[props.groupId];
  });

export const selectGetUsers = createSelector(
  selectAuthState,
  (state): UserListPersonalData[] => {
    return state.users.Items;
  }
);

// console.log('messGroup');
// const usersObj = Object.assign(
//   {},
//   ...state.users.Items.map(item => {
//     return { [item.uid.S]: item.name.S };
//   })
// );

// const messGroup = state.dialogs[props.groupId]
//   .map(mes => {
//     return {
//       name: usersObj[mes.authorID.S],
//       time: mes.createdAt.S,
//       message: mes.message.S,
//       id: mes.authorID.S,
//     };
//   })
//   .sort((a, b) => +a.time - +b.time);
// const conversationList = state.dialogs[`${props.groupId}`].map(item => item);
// console.log(messGroup);
