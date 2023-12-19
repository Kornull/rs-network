import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  GroupsData,
  ProfileInfoType,
  UserDataInfo,
  UserState,
} from '../models';

export const selectAuthState = createFeatureSelector<UserState>('user');

export const selectGetErrorEmails = createSelector(
  selectAuthState,
  (state): string[] => {
    return state.invalidEmails.PrimaryDuplicationException;
  }
);

export const selectIsUserLogged = createSelector(
  selectAuthState,
  (state): boolean => {
    return state['user-logged'];
  }
);

export const selectCheckProfileInfo = createSelector(
  selectAuthState,
  (state): ProfileInfoType | null => {
    return state.profile;
  }
);

export const selectGroupsInfo = createSelector(
  selectAuthState,
  (state): GroupsData => {
    return state.groups;
  }
);

export const selectAllUsersInfo = createSelector(
  selectAuthState,
  (state): UserDataInfo => {
    const conversationList = state.conversations.Items.map(
      item => item.companionID.S
    );

    return {
      count: state.users.Count,
      users: state.users.Items.map(user => {
        return conversationList.includes(user.uid.S)
          ? {
              ...user,
              isConversation: true,
            }
          : user;
      }),
    };
  }
);

export const selectGroupMessages = (props: { groupId: string }) =>
  createSelector(selectAuthState, state => {
    console.log('messGroup');
    const usersObj = Object.assign(
      {},
      ...state.users.Items.map(item => {
        return { [item.uid.S]: item.name.S };
      })
    );

    const messGroup = state.dialogs[props.groupId]
      .map(mes => {
        return {
          name: usersObj[mes.authorID.S],
          time: mes.createdAt.S,
          message: mes.message.S,
          id: mes.authorID.S,
        };
      })
      .sort((a, b) => +a.time - +b.time);
    // const conversationList = state.dialogs[`${props.groupId}`].map(item => item);
    console.log(messGroup);

    return messGroup;
  });
